const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");
const moment = require("moment");

const EmsModel = require("../model/emsModel");

var AWS = require("aws-sdk");

const { awsConfig } = require("../config/config");

AWS.config = awsConfig;

module.exports = {
  findEmployeeByEntryAccesId: (req, callBack) => {
    console.log("ea_id: " + req.body.ea_id);
    console.log("ea_type: " + req.body.ea_type);

    EmsModel.query("ea_type")
      .eq(req.body.ea_type)
      .and()
      .where("ea_id")
      .eq(req.body.ea_id)
      .using("entry-access")
      .exec((error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log("found emp for given ea_id: " + result[0].pk);
          console.log(result);
          return callBack(null, result[0]);

          // [ Document { name: 'Will', breed: 'Terrier', id: 1 },
          //   lastKey: undefined,
          //   count: 1,
          //   queriedCount: 2,
          //   timesQueried: 1 ]
          //  console.log(results[0]); // { name: 'Will', breed: 'Terrier', id: 1 }
          // console.log(results.count); // 1
          //  console.log(Array.isArray(results)); // true
          // console.log(results.scannedCount); // 2
        }
      });
  },
  updateLoggingService: (params, callBack) => {
    console.log("updateLoggingService" + params.pk + params.entryChannel);
    let m = moment();

    const pk = params.pk; // pk is emp_id
    const sk =
      "attn_reg_" + m.format("MM").toString() + m.format("yyyy").toString();
    const entryChannel = params.entryChannel;

    console.log("pk & sk: " + pk + " " + sk);
    const loggingType = params.loggingType;
    var label =
      m.format("DD").toString() + m.format("MM").toString() + "_logging";

    if (loggingType == "entry") {
      EmsModel.update(
        { pk: pk, sk: sk },
        /*  {$SET: {"name": "entry_exit_logs"}},  */ {
          $ADD: {
            entry_logs: [
              {
                [label]: {
                  ea_channel: entryChannel,
                  entry_time: m.toString(),
                },
              },
            ],
          },
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
    } else {
      EmsModel.update(
        { pk: pk, sk: sk },
        /*  {$SET: {"name": "entry_exit_logs"}},  */ {
          $ADD: {
            exit_logs: [
              {
                [label]: {
                  ea_channel: entryChannel,
                  exit_time: m.toString(),
                },
              },
            ],
          },
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
    }
  },
  updateDurationService: (req, callBack) => {
    console.log("controler" + req.body.pk);
    let m = moment();

    const pk = req.body.pk;
    const sk =
      "attn_reg_" + m.format("MM").toString() + m.format("yyyy").toString();

    EmsModel.query("pk", "sk")
      .eq(pk)
      .eq(sk)
      .exec((error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log(results);

          //   console.log(results[0]); // { name: 'Will', breed: 'Terrier', id: 1 }
          //     console.log(results.count); // 1
          //   console.log(Array.isArray(results)); // true
          //   console.log(results.scannedCount); // 2
        }
      });
  },
};
