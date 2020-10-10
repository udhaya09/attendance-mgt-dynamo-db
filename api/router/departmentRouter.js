const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const { createDepartment } = require("../controller/departmentController");
const { deleteDepartment } = require("../controller/departmentController");
const { updateDepartment } = require("../controller/departmentController");

//creating new department
router.post("/", createDepartment);

//set permission to admin
router.patch("/:pk/:sk", updateDepartment);

//delete department
router.delete("/:pk/:sk", deleteDepartment);

module.exports = router;
