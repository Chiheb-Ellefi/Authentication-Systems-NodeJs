const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

module.exports = (req, res, next) => {
  const token = req.cookies.Jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decoded.userId);
        res.locals.user = user;

        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
