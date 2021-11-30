const express = require("express");
const router = express.Router();

const { getLogin } = require("../Controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
