const { StatusCodes } = require("http-status-codes");
module.exports = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).send("Route Does Not Exist!");
};
