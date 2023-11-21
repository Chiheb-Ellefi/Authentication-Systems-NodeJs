const CustomError = require("./cutom_error");
const { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = Unauthenticated;
