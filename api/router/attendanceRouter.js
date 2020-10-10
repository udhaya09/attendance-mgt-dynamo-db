const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");


const {createAttendanceRegister} = require("../controller/attendanceController")
const {updateLogging} = require("../controller/attendanceController")


//creating createAttendanceRegister
router.post("/", createAttendanceRegister);

//update logging entry exit logs
router.patch("/update-logging", updateLogging);

module.exports = router;