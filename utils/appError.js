class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperationalError = true;

    // When new obj is created by this class, constructor call wont pollute stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
