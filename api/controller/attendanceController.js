const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");
const moment = require('moment');

const EmsModel = require("../model/emsModel");

const { findEmployeeByEntryAccesId } = require("../service/attendanceService");
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
    aws_access_key_id: "AKIAZTMTSMHZZBDRNBUX",
    aws_secret_access_key: "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",
  });
  
  console.log("test");
  var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    createAttendanceRegister: (req, res) => {      

    let m = moment();                 // Create a new date, which defaults to the current time
    const attnId = "attn_reg_" + m.format('MM').toString() + m.format('yyyy').toString();
  
      const attnRegister = new EmsModel({
        //id: empId,
        pk: "emp_" + req.body.emp_id,
        sk: attnId,      
        entry_logs: req.body.entry_logs,
        exit_logs: req.body.exit_logs
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
    updateLogging:(req, res, next) => {

        findEmployeeByEntryAccesId(req, (err, result) => {
            if (err) {
                console.log(err);
              }
              else{
                  console.log("controler" + result.pk);
                  let m = moment();    
                  const pk = result.pk;
                  const sk = "attn_reg_" + m.format('MM').toString() + m.format('yyyy').toString();
  
                  console.log("pk & sk: " + pk + " " + sk);
                  const loggingType = req.body.loggingType;
                  var label = "logging_" + Date.now();
  
                 
                 if(loggingType == 'entry'){
                    EmsModel.update({ pk: pk, sk: sk },
                        /*  {$SET: {"name": "entry_exit_logs"}},  */{$ADD: {"entry_logs":[m.toString()]}},
                           (error, result) => {
                             if (error) {
                               console.error(error);
                               res.status(500).json({ error: err });
                             } else {
                               console.log(result);
                               res.status(200).json({
                                 message: "entry or exit logged",
                                 result: result,
                               });
                             }
                           }
                         );
                 }else{
                    EmsModel.update({ pk: pk, sk: sk },
                        /*  {$SET: {"name": "entry_exit_logs"}},  */{$ADD: {"exit_logs":[m.toString()]}},
                           (error, result) => {
                             if (error) {
                               console.error(error);
                               res.status(500).json({ error: err });
                             } else {
                               console.log(result);
                               res.status(200).json({
                                 message: "entry or exit logged",
                                 result: result,
                               });
                             }
                           }
                         );
                 
                 }
            
                  ///

             
                    /////
  
                }

                   



            });
    },

       
    };