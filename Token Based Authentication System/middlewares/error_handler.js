const { StatusCodes } = require("http-status-codes");

module.exports = (err, req, res, next) => {
  let CustomError = {
    message: err.message || "An error occured ,try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    CustomError.message = {};
    CustomError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

    Object.values(err.errors).forEach(({ properties }) => {
      CustomError.message[properties.path] = properties.message;
    });
  }
  if (err.code === 11000) {
    CustomError.message = { email: "Email address already in use ." };
    CustomError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
  res.status(CustomError.statusCode).json({ errors: CustomError.message });
};
