const express = require("express");
require("express-async-errors");
require("dotenv").config();
const session = require("express-session");
const connectDB = require("./db/connect");
const router = require("./routes/router");
const mongoDBSession = require("connect-mongodb-session")(session);
const NotFound = require("./middlewares/not_found");
const ErrorHandlerMiddleware = require("./middlewares/error_handler");
const app = express();
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const { strict } = require("assert");
//set ejs as view engine
app.set("view engine", "ejs");
//access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//set up a collection to store  sessions
const store = new mongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "Sessions",
});
// Generate a random secret key for signing the session cookie
const secretKey = crypto.randomBytes(32).toString("hex");

app.use(cookieParser(secretKey));
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 6000,
      sameSite: "lax",
    },
  })
);
app.use(router);
app.use(NotFound);
app.use(ErrorHandlerMiddleware);

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log("server listening on port ", port));
  } catch (error) {
    console.log(error);
  }
};

start();
