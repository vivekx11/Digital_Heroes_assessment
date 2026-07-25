/**
 * Centralized Express Error Handling Middleware.
 * Prevents server crashes and returns normalized JSON error responses.
 */
function errorHandler(err, req, res, next) {
  // Handle Express JSON syntax errors (malformed JSON body)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload'
    });
  }

  const statusCode = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  const message = err.message || 'Internal Server Error';

  console.error(`[Error Handler] ${req.method} ${req.originalUrl} - ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    message: message
  });
}

module.exports = errorHandler;
