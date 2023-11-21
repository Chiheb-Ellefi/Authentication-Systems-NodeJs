const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom_error");
class UnauthanticatedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
module.exports = UnauthanticatedError;