const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const {
    getDashboard,
    getLandingScreen,
    getLoginScreen,
    getRegisterScreen,
    login,
    register,
    logout,
} = require("../controllers/controllers");
const router = express.Router();

router.route("/").get(getLandingScreen);
router.route("/login").get(getLoginScreen).post(login);
router.route("/register").get(getRegisterScreen).post(register);
router.route("/dashboard").get(isAuthenticated, getDashboard);
router.route("/logout").post(logout);
module.exports = router;