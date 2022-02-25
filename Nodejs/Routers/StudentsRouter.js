const express = require("express");

const controller = require("./../Controllers/StudentsController")

const router = express.Router();
//-------------------------------- list
router.get("", controller.getStudents);

module.exports = router;