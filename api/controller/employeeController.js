const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const EmsModel = require("../model/emsModel");

module.exports = {
  createEmployee: (req, res) => {
    const empId = customId({ randomLength: 1 });

    const employee = new EmsModel({
      //id: empId,
      pk: "emp_" + empId,
      sk: "emp_prof_" + empId,
      fullname: req.body.fullname,
      emp_id: empId,
      dob: req.body.dob,
      position: req.body.position,
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
  },
};
