const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const { createEntryAccessForEmployee } = require("../controller/entryAccessController");

//creating new entry access channel for employee
router.post("/", createEntryAccessForEmployee);

module.exports = router;


  