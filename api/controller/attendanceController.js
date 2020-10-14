const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");
const moment = require("moment");

const EmsModel = require("../model/emsModel");

const {
  findEmployeeByEntryAccesId,
  updateLoggingService,
  updateDurationService,
} = require("../service/attendanceService");
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
    let m = moment(); // Create a new date, which defaults to the current time
    const attnId =
      "attn_reg_" + m.format("MM").toString() + m.format("yyyy").toString();

    const attnRegister = new EmsModel({
      //id: empId,
      pk: "emp_" + req.body.emp_id,
      sk: attnId,
      entry_logs: req.body.entry_logs,
      exit_logs: req.body.exit_logs,
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
  updateLogging: (req, res, next) => {
    findEmployeeByEntryAccesId(req, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const params = {
          pk: result.pk,
          loggingType: req.body.loggingType,
        };
        updateLoggingService(params, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: err });
          } else {
            res.status(200).json({
              message: "entry or exit logged",
              result: result,
            });
          }
        });
      }
    });
  },
  updateDuration: (req, res, next) => {
    console.log("inside update duration");
    updateDurationService(req, (err, result) => {});
  },
};
