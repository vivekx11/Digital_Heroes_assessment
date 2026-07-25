const cheerio = require('cheerio');

/**
 * Parses HTML content using Cheerio and extracts SEO/technical page metrics.
 * 
 * @param {string} html - Raw HTML text content.
 * @returns {object} Extracted metrics object.
 */
function parseHtmlMetrics(html) {
  if (!html || typeof html !== 'string') {
    return {
      pageTitle: '',
      metaDescription: '',
      h1Count: 0,
      missingAltImages: 0,
      wordCount: 0
    };
  }

  const $ = cheerio.load(html);

  // Extract Title
  const pageTitle = ($('title').first().text() || '').trim();

  // Extract Meta Description
  let metaDescription = ($('meta[name="description"]').attr('content') || '').trim();
  if (!metaDescription) {
    metaDescription = ($('meta[property="og:description"]').attr('content') || '').trim();
  }

  // Count H1 Elements
  const h1Count = $('h1').length;

  // Count Images missing Alt attribute (missing alt attribute or empty string)
  let missingAltImages = 0;
  $('img').each((_, el) => {
    const alt = $(el).attr('alt');
    if (alt === undefined || alt === null || alt.trim() === '') {
      missingAltImages++;
    }
  });

  // Calculate Word Count from body text (excluding script, style, noscript, svg, etc.)
  const $body = $('body').clone();
  $body.find('script, style, noscript, svg, iframe, canvas, option, select').remove();
  const bodyText = $body.text().replace(/\s+/g, ' ').trim();
  
  const words = bodyText.length > 0 ? bodyText.split(' ').filter(w => w.length > 0) : [];
  const wordCount = words.length;

  return {
    pageTitle,
    metaDescription,
    h1Count,
    missingAltImages,
    wordCount
  };
}

module.exports = {
  parseHtmlMetrics
};
