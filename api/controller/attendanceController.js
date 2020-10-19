const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");
const moment = require("moment");
const momentNow = moment();

const EmsModel = require("../model/emsModel");

const {
  findEmployeeByEntryAccesId,
  updateLoggingService,
  updateDurationService,
} = require("../service/attendanceService");
var AWS = require("aws-sdk");

const { awsConfig } = require("../config/config");

AWS.config = awsConfig;

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
      attendence_logs: [],
      ot_logs: [],
      leave_records: [],
      permission_records: [],
      shift_schedule: [],
      entry_logs: [],
      exit_logs: [],
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
          entryChannel: req.body.ea_type,
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
  updateShiftSchedule: (req, res, next) => {
    console.log("inside updateShiftSchedule");
    var emp_id = req.body.emp_id;
    var pk = "emp_" + emp_id;
    var sk =
      "attn_reg_" +
      momentNow.format("MM").toString() +
      momentNow.format("yyyy").toString();

    var shiftSchedule = [
      {
        day_01_0110_1: {
          shift: "general",
          entry_time: "10:30",
          exit_time: "18:30",
          duration: "560",
        },
        day_01_0110_2: {
          shift: "night",
          entry_time: "20:30",
          exit_time: "06:30",
          duration: "480",
        },
      },
    ];

    EmsModel.update(
      { pk: "emp_1234", sk: "attn_reg_102020" },
      {
        $ADD: { shift_schedule: shiftSchedule },
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return callBack(null, error);
          // res.status(500).json({ error: err });
        } else {
          console.log(result);
          return callBack(null, error);
        }
      }
    );
  },
};
