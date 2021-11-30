const cookieParser = require("cookie-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// internal imports
const {
  notFound,
  defaultErrorHandler,
} = require("./middlewares/common/errorHandler");

const loginRouter = require("./routes/loginRouter");
const userRouter = require("./routes/userRouter");
const inboxRouter = require("./routes/inboxRouter");

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Db connected successfully"))
  .catch((err) => console.log(err));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engin
app.set("view engine", "ejs");

// static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// application routers
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

// error handler
app.use(notFound);

// default error
app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("listening to port" + process.env.PORT);
});
