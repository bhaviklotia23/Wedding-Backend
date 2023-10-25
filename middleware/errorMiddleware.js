const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Handle AppError instances
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle other error types
  if (err.name === 'CastError') {
    const message = `Resource not found ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Json Web Token is invalid. Try again.';
    err = new ErrorHandler(message, 400);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Json Web Token has expired. Try again.';
    err = new ErrorHandler(message, 400);
  }

  // Handle other error types not explicitly caught above
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
