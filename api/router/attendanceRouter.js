const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");


const {
  createAttendanceRegister,
  updateLogging,
  updateDuration,
  updateShiftSchedule
} = require("../controller/attendanceController");

//creating createAttendanceRegister
router.post("/", createAttendanceRegister);

//update logging entry exit logs
router.patch("/update-logging", updateLogging);

//update duration
router.patch("/update-duration", updateDuration);

//update duration
router.patch("/update-shift-schedule", updateShiftSchedule);

module.exports = router;
