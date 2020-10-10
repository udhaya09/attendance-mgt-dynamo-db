    const express = require("express");
    const router = express.Router();
    const { v4: uuidv4 } = require("uuid");
    const customId = require("custom-id");
    const dynamoose = require("dynamoose")

    var AWS = require("aws-sdk");


    AWS.config.update({
    region: "us-east-2",
    aws_access_key_id: "AKIAZTMTSMHZZBDRNBUX",
    aws_secret_access_key: "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",
    });


    module.exports = {

        findEmployeeByEntryAccesId : (req, callBack) =>  {
         
            console.log("test - ea_id: "+ req.body.ea_id) ;
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "ems_model",
        ProjectionExpression: "pk",
        FilterExpression: "ea_id = :ea_id",
             ExpressionAttributeValues: {            
            ":ea_id": req.body.ea_id,
        }
    };


    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the movies
            console.log("Scan succeeded.");
            data.Items.forEach(function(result) {
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


    }

