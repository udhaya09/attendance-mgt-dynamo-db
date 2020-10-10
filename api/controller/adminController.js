const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const EmsModel = require("../model/emsModel");


module.exports = {
  createAdminUser: (req, res) => {
    const empId = customId({ randomLength: 1 });

    const adminUser = new EmsModel({
      //id: empId,
      pk: "emp_" + empId,
      sk: "adm_prof_" + empId,
      fullname: req.body.fullname,
      emp_id: empId,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
     
    });
    adminUser
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          // message: "POST /employees",
          createdEmployee: adminUser,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },
  setPermissions:(req, res, next) => {
    const permissions = req.body;
    //const empId = req.params.empId;
  
    EmsModel.update(
      { pk: req.params.pk, sk: req.params.sk },
      permissions,
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: err });
        } else {
          console.log(result);
          res.status(200).json({
            message: "permissions added",
            result: result,
          });
        }
      }
    );
  },
  setRoles:(req, res, next) => {
    const roles = req.body;
    //const empId = req.params.empId;
  
    EmsModel.update(
      { pk: req.params.pk, sk: req.params.sk },
      roles,
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: err });
        } else {
          console.log(result);
          res.status(200).json({
            message: "roles added",
            result: result,
          });
        }
      }
    );
  },
  deleteAdmin : (req, res, next) => {
    EmsModel.delete({ pk: req.params.pk, sk: req.params.sk }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "admin deleted",
        });
      }
    });
  },
};
