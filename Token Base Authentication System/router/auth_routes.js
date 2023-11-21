const express = require("express");
const {
  getLoginPage,
  getSignupPage,
  login,
  signup,
  logout,
} = require("../controllers/auth");

const router = express.Router();

router.route("/login").get(getLoginPage).post(login);

router.route("/signup").get(getSignupPage).post(signup);

router.route("/logout").get(logout);

module.exports = router;
