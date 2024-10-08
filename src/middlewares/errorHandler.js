// not found error handler

export const notFoundErrorHandler = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  next(error);
};

export const errorHanlder = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOptional = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
