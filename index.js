// external imports
const cookieParser = require("cookie-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const moment = require("moment");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Db connected successfully"))
  .catch((err) => console.log(err));

// app.use(cors());
app.use(express.json());
const server = http.createServer(app);
app.use(express.urlencoded({ extended: true }));

// socket creation
const io = require("socket.io")(server);
global.io = io;

// set comment as app locals
app.locals.moment = moment;

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
app.use(notFoundHandler);

// default error
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("listening to port" + process.env.PORT);
});
