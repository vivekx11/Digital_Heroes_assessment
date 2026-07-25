/**
 * Validates whether a string is a well-formed HTTP/HTTPS URL.
 * 
 * @param {string} urlString - The URL string to validate.
 * @returns {boolean} True if valid HTTP/HTTPS URL, false otherwise.
 */
function validateUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') {
    return false;
  }

  const trimmed = urlString.trim();
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

module.exports = {
  validateUrl
};
