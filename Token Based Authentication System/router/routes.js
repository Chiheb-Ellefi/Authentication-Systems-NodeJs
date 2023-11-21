const express = require("express");
const authMidlleware = require("../middlewares/authentication");
const router = express.Router();
const { getHome, getSmoothies } = require("../controllers/controllers");

router.route("/").get(getHome);
router.route("/smoothies").get(authMidlleware, getSmoothies);

module.exports = router;
