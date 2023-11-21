const { StatusCodes } = require("http-status-codes");

module.exports = (error, req, res, next) => {
    let CustomError = {
        message: error.message || "Something went wrong, try again later",
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    };
    if (error.name === "ValidationError") {
        CustomError.message = Object.values(error.errors)
            .map((item) => item.message)
            .join(",");
        CustomError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    }
    if (error.code && error.code === 11000) {
        CustomError.message = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )}, please choose another value `;
        CustomError.statusCode = StatusCodes.CONFLICT;
    }

    res.status(CustomError.statusCode).send(CustomError.message);
};