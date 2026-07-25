export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';

  console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: err.message || 'An unexpected server error occurred',
      details: err.details || []
    },
    timestamp: new Date().toISOString()
  });
};
