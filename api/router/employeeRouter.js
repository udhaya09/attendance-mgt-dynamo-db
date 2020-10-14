const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const { createEmployee } = require("../controller/employeeController");
const { deleteEmployee } = require("../controller/employeeController");
const { updateEmployeAttributes } = require("../controller/employeeController");
const {
  associateVehicleToEmployee,
} = require("../controller/employeeController");
const { findEmployeByPhone } = require("../controller/employeeController");
const {
  findEmployeByEmail,
  getAllEmployees,
} = require("../controller/employeeController");
//const { findAllEmployees } = require("../controller/employeeController");

//creating new employee
router.post("/", createEmployee);

//update employee attributes
router.patch("/update-employee-attributes/:pk/:sk", updateEmployeAttributes);

//associate vehicle attributes
router.patch("/assoc-vehicle/:pk/:sk", associateVehicleToEmployee);

//delete employee
router.delete("/:pk/:sk", deleteEmployee);

//find by phone
router.get("/phone/:phone", findEmployeByPhone);

router.get("/email/:email", findEmployeByEmail);

router.get("/", getAllEmployees);

//find all employee
//router.get("/", findAllEmployees);

//get particular employee based on department and emp_id (pk and sk)
router.get("/:pk/:sk", (req, res, next) => {
  console.log("pk: " + req.params.pk);
  console.log("sk: " + req.params.sk);

  Employee.get({ pk: req.params.pk, sk: req.params.sk }, (err, emp) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      console.log(emp);
      res.status(200).json({
        message: "employee retrived",
        employee_info: emp,
      });
    }
  });
});

//updating an employee based on pk and sk
router.patch("/:pk/:sk", (req, res, next) => {
  const empAttr = req.body;
  //const empId = req.params.empId;

  Employee.update(
    { pk: req.params.pk, sk: req.params.sk },
    empAttr,
    (error, emp) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: err });
      } else {
        console.log(emp);
        res.status(200).json({
          message: "employee retrived",
          employee_info: emp,
        });
      }
    }
  );
});

//deleting employee
router.delete("/:pk/:sk", (req, res, next) => {
  Employee.delete({ pk: req.params.pk, sk: req.params.sk }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({
        message: "employee deleted",
      });
    }
  });
});

//creating entry channel to employee
router.post("/create-entry-channel", (req, res, next) => {
  const employee = new Employee({
    //id: empId,
    pk: req.body.emp_id,
    sk: "entry_channel_" + req.body.entry_channel,
    login_id: req.body.login_id,
  });

  employee
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "POST /employees",
        createdEmployee: employee,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
