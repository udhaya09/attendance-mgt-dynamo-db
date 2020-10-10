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
  updateEmployeAttributes:(req, res, next) => {
    const empAttributes = req.body;
    //const empId = req.params.empId;
  
    EmsModel.update(
      { pk: req.params.pk, sk: req.params.sk },
      empAttributes,
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: err });
        } else {
          console.log(result);
          res.status(200).json({
            message: "empAttributes added",
            result: result,
          });
        }
      }
    );
  },
  associateVehicleToEmployee:(req, res, next) => {
    const vehicleAttributes = req.body;
    //const empId = req.params.empId;
  
    EmsModel.update(
      { pk: req.params.pk, sk: req.params.sk },
      vehicleAttributes,
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: err });
        } else {
          console.log(result);
          res.status(200).json({
            message: "vehicleAttributes associated",
            result: result,
          });
        }
      }
    );
  },
  deleteEmployee : (req, res, next) => {
    EmsModel.delete({ pk: req.params.pk, sk: req.params.sk }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "employee deleted",
        });
      }
    });
  },
};