const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  };

  // error validation dari mongoose
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  if (err.name === 'MulterError') {
    customError.message = 'file size must be less than 5MB',
    customError.statusCode = 413
  }

  return res.status(customError.statusCode).json({ status: 'error', message: customError.message });
};

module.exports = errorHandlerMiddleware;
