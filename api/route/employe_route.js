const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const EimsModel = require("../model/emsModel");

//creating new employee
router.post("/", (req, res, next) => {
  const empId = customId({ randomLength: 1 });
  const profile = req.body;

  const employee = new Employee({
    //id: empId,
    pk: "emp_" + empId,
    sk: "prof_" + empId,
    fullname: req.body.fullname,
    emp_id: empId,
    dob: req.body.dob,
    position: req.body.designation,
    department: req.body.department,
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

//get all employees
router.get("/", (req, res, next) => {
  Employee.scan()
    .all()
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({ message: "No entries found" });
      }
    })
    .catch((err) => {
      console.log(error, err);
      ``;
      res.status(500).json({ error: err });
    });
});

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
