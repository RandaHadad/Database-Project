const express = require("express");

const controller = require("./../Controllers/FinalController")

const router = express.Router();
//-------------------------------- list
router.get("", controller.start);
router.post("", controller.sendans);

module.exports = router;