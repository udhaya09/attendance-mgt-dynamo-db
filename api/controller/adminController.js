const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const EmsModel = require("../model/emsModel");

// creating admin user
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
};
