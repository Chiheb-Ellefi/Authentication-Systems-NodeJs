const User = require("../models/user_model");
const { NotFound, Unauthenticated, BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getLoginPage = async (req, res) => {
  res.render("login");
};

const getSignupPage = async (req, res) => {
  res.render("signup");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Provide an email and password ");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated("Invalid Credentials");
  }
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new Unauthenticated("Invalid Credentials");
  }
  const token = user.createToken();

  res.cookie("Jwt", token, {
    sameSite: "Lax",
    httpOnly: true,
    maxAge: 2 * 24 * 60 * 60,
  });

  res.status(StatusCodes.OK).json({ user });
};

const signup = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user: "User Created" });
};

const logout = async (req, res) => {
  res.cookie("Jwt", "", { maxAge: 1 });
  res.status(StatusCodes.OK).redirect("/");
};

module.exports = {
  getLoginPage,
  getSignupPage,
  login,
  signup,
  logout,
};
