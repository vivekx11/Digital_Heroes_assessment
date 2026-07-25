const { validateUrl } = require('../utils/urlValidator');
const { auditPage } = require('../services/auditService');

/**
 * Controller for handling POST /api/audit
 */
async function performAudit(req, res, next) {
  try {
    const { url } = req.body || {};

    // Validate URL syntax and protocol
    if (!url || !validateUrl(url)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL'
      });
    }

    // Perform Page Audit
    const auditData = await auditPage(url.trim());

    return res.status(200).json({
      success: true,
      data: auditData
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  performAudit
};
