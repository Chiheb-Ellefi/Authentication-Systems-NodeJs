const Unauthenticated = require("../errors/unauthenticated");

module.exports = (req, res, next) => {
    if (req.session.isAuth) {
        next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
        //res.redirect("/login");
        next(new Unauthenticated("Not authorized"));
    }
};