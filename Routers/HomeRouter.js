const express = require("express");

const controller = require("./../Controllers/HomeController")

const router = express.Router();
//-------------------------------- list
router.get("", controller.stdHome);
router.post("", controller.examinfo);

module.exports = router;