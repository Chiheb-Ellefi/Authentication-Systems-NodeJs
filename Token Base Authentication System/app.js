const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const notFound = require("./middlewares/not_found");
const errorHandlerMiddleware = require("./middlewares/error_handler");
const authRouter = require("./router/auth_routes");
const appRouter = require("./router/routes");
const app = express();
const checkUser = require("./middlewares/check_user");
//set view engine as ejs
app.set("view engine", "ejs");
//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));
app.get("*", checkUser);
app.use(authRouter);
app.use(appRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server Listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
