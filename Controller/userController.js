function getUser(req, res, next) {
  res.render("users", {
    title: "User Page",
  });
}

module.exports = { getUser };
