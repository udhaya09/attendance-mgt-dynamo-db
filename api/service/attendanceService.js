const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");
const moment = require("moment");

const EmsModel = require("../model/emsModel");

var AWS = require("aws-sdk");

const {awsConfig} = require("../config/config");

AWS.config = awsConfig;

module.exports = {
  findEmployeeByEntryAccesId: (req, callBack) => {
    console.log("test - ea_id: " + req.body.ea_id);
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
      TableName: "ems_model",
      ProjectionExpression: "pk",
      FilterExpression: "ea_id = :ea_id",
      ExpressionAttributeValues: {
        ":ea_id": req.body.ea_id,
      },
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
      if (err) {
        console.error(
          "Unable to scan the table. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function (result) {
          console.log(result.pk);
          return callBack(null, result);
        });

        /*     // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            } */
      }
    }
  },
  updateLoggingService: (params, callBack) => {
    console.log("controler" + params.pk);
    let m = moment();

    const pk = params.pk;
    const sk =
      "attn_reg_" + m.format("MM").toString() + m.format("yyyy").toString();

    console.log("pk & sk: " + pk + " " + sk);
    const loggingType = params.loggingType;
    var label =
      "logging_" +
      m.format("DD").toString() +
      m.format("MM").toString() +
      m.format("yyyy").toString() +
      "_1";

    if (loggingType == "entry") {
      EmsModel.update(
        { pk: pk, sk: sk },
        /*  {$SET: {"name": "entry_exit_logs"}},  */ {
          $ADD: { entry_logs: [m.toString()] },
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
          $SET: { entry_logs: [m.toString()] },
        },
        (error, result) => {
          if (error) {
            console.error(error);
            return callBack(null, error);
          } else {
            console.log(result);
            return callBack(null, result);
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
