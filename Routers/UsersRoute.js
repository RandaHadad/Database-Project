const express = require("express");

const controller = require("./../Controllers/UsersController")

const router = express.Router();
//-------------------------------- list
router.get("", controller.getUsers);
router.post("", controller.login);

module.exports = router;