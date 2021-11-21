const createError = require("http-errors");

// 404 not found
function notFound(req, res, next) {
  next(createError(404, "Content not found"));
}

// default error handller
function defaultErrorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV !== "production" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    res.render("error", { title: "Error Page" });
  } else {
    res.json(res.locals.error);
  }
}

module.exports = { notFound, defaultErrorHandler };
