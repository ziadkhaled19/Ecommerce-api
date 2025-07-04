const AppError = require("./../utils/AppError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const devError = (err, res) => {
  res.status(err.statusCode).json({
    environment: process.env.NODE_ENV,
    status: err.status,
    message: err.message,
    error: err.message,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      environment: process.env.NODE_ENV,
      status: err.status,
      error: err.message,
    });
  } else {
    console.error("ERRRROR!", err);
    res.status(500).json({
      status: "error",
      message: "programming error",
    });
  }
};
module.exports = (err, req, res, next) => {
  console.error("\x1b[31m", "--- ERROR ---"); // Red color
  console.error(err.stack || err);
  console.error("\x1b[0m", "-------------"); // Reset color
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV !== "production") {
    devError(err, res);
  } else {
    if (err.name == "CastError") err = handleCastErrorDB(err);
    if (err.code == 11000) err = handleDuplicateFieldsDB(err);
    if (err.name == "ValidationError") err = handleValidationErrorDB(err);
    if (err.name == "JsonWebTokenError") err = handleJWTError();
    if (err.name == "TokenExpiredError") err = handleJWTExpiredError();
    prodError(err, res);
  }
};
