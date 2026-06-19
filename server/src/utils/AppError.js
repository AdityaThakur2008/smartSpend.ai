class AppError extends Error {
  constructor(message, statusCode , errorDetails = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errorDetails = errorDetails;

    Error.captureStackTrace(this, this.constructor);
  }
}


export default AppError;