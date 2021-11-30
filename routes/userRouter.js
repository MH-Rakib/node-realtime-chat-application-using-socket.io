// external imports
const express = require("express");

// internal imports
const avatarUpload = require("../middlewares/user/avatarUpload");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/user/userValidators");

const router = express.Router();

// user page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add new user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

router.delete("/:id", removeUser);

module.exports = router;
