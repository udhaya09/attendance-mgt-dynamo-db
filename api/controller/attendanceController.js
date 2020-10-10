const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");
const moment = require('moment');

const EmsModel = require("../model/emsModel");

module.exports = {
    createAttendanceRegister: (req, res) => {
      

      let m = moment();                 // Create a new date, which defaults to the current time
    const attnId = "attn_reg_" + m.format('MM').toString() + m.format('yyyy').toString();
  
      const attnRegister = new EmsModel({
        //id: empId,
        pk: "emp_" + req.body.emp_id,
        sk: attnId,      
      });
      attnRegister
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            // message: "POST /employees",
            result: attnRegister,
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
    
  };