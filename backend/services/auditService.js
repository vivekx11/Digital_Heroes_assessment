const axios = require('axios');
const { parseHtmlMetrics } = require('../utils/htmlParser');

/**
 * Service to fetch and audit a given web page URL.
 * 
 * @param {string} targetUrl - Validated target URL to fetch and analyze.
 * @returns {Promise<object>} Result data object or throws custom error.
 */
async function auditPage(targetUrl) {
  const timeoutMs = parseInt(process.env.FETCH_TIMEOUT_MS, 10) || 5000;
  const startTime = Date.now();

  let response;
  try {
    response = await axios.get(targetUrl, {
      timeout: timeoutMs,
      maxRedirects: 5,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PagePulse/1.0 (Web Audit Bot)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      // Do not throw on 4xx/5xx responses immediately so we can inspect status if needed,
      // but if unreachable network error occurs, catch block catches it.
      validateStatus: () => true
    });
  } catch (error) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
      const err = new Error('Request timed out');
      err.statusCode = 504;
      throw err;
    }
    const err = new Error(error.message || 'Website unavailable');
    err.statusCode = 500;
    throw err;
  }

  const responseTimeMs = Date.now() - startTime;
  const responseTimeFormatted = `${responseTimeMs}ms`;

  // Check Content-Type header to ensure response is HTML
  const contentType = (response.headers['content-type'] || '').toLowerCase();
  const isHtml = contentType.includes('text/html') || contentType.includes('application/xhtml+xml');
  
  if (!isHtml) {
    const err = new Error('URL does not contain HTML');
    err.statusCode = 415;
    throw err;
  }

  // If remote server returns a failure status code (e.g. 500, 502, 503) or is unreachable
  if (response.status >= 500) {
    const err = new Error(`Website unavailable (HTTP ${response.status})`);
    err.statusCode = 500;
    throw err;
  }

  // Parse HTML for metrics
  const htmlContent = response.data;
  const parsedMetrics = parseHtmlMetrics(typeof htmlContent === 'string' ? htmlContent : '');

  return {
    url: targetUrl,
    status: response.status,
    responseTime: responseTimeFormatted,
    pageTitle: parsedMetrics.pageTitle,
    metaDescription: parsedMetrics.metaDescription,
    h1Count: parsedMetrics.h1Count,
    missingAltImages: parsedMetrics.missingAltImages,
    wordCount: parsedMetrics.wordCount
  };
}

module.exports = {
  auditPage
};
