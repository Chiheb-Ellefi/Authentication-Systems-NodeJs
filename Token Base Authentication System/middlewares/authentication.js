const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.Jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).redirect("/login");
  }
};
module.exports = authMiddleware;
