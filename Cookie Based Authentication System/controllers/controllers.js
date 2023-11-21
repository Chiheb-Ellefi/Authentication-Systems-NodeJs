const User = require("../models/user_model.js");
const { Unauthenticated, NotFound, BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const getLandingScreen = (req, res) => {
  res.status(StatusCodes.OK).render("landing");
};
const getLoginScreen = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.status(StatusCodes.OK).render("login", { err: error });
};
const getRegisterScreen = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.status(StatusCodes.OK).render("register", { err: error });
};
const getDashboard = (req, res) => {
  const email = req.session.email;
  res.cookie("Email", email, {
    signed: true,
    path: "/dashboard",
    httpOnly: true,
  });
  res.status(StatusCodes.OK).render("dashboard", { name: email });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Provide an valid email and password");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Unauthenticated("Unauthenticated ");
  }
  req.session.email = email;
  req.session.isAuth = true;
  res.status(StatusCodes.OK).redirect("dashboard");
};
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).redirect("/login");
};
const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
};

module.exports = {
  getDashboard,
  getLandingScreen,
  getLoginScreen,
  getRegisterScreen,
  login,
  register,
  logout,
};
