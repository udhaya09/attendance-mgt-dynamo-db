const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const EmsModel = require("../model/emsModel");

module.exports = {
    createDepartment: (req, res) => {
      const deptId = customId({ randomLength: 1 });
  
      const department = new EmsModel({
        //id: empId,
        pk: "dept_" + deptId,
        sk: "dept_metadata_" + deptId,
        dept_name: req.body.dept_name,
        dept_id: deptId,
      });
      department
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            // message: "POST /employees",
            result: department,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    },
    updateDepartment:(req, res, next) => {
        const departmentAttri = req.body;
        //const empId = req.params.empId;
      
        EmsModel.update(
          { pk: req.params.pk, sk: req.params.sk },
          departmentAttri,
          (error, result) => {
            if (error) {
              console.error(error);
              res.status(500).json({ error: err });
            } else {
              console.log(result);
              res.status(200).json({
                message: "department updated",
                result: result,
              });
            }
          }
        );
      },
    deleteDepartment : (req, res, next) => {
        EmsModel.delete({ pk: req.params.pk, sk: req.params.sk }, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: err });
          } else {
            res.status(200).json({
              message: "department deleted",
            });
          }
        });
      },
    
  };
  