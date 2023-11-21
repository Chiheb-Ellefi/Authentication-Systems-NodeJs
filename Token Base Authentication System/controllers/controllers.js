const { StatusCodes } = require("http-status-codes");

const getHome = (req, res) => {
  res.status(StatusCodes.OK).render("home");
};

const getSmoothies = (req, res) => {
  res.status(StatusCodes.OK).render("smoothies");
};

module.exports = {
  getHome,
  getSmoothies,
};
