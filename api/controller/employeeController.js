const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const EmsModel = require("../model/emsModel");

var AWS = require("aws-sdk");


AWS.config.update({
  region: "us-east-2",
  aws_access_key_id: "AKIAZTMTSMHZZBDRNBUX",
  aws_secret_access_key: "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",
});

console.log("test");
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  createEmployee: (req, res) => {
    const empId = customId({ randomLength: 1 });

    const employee = new EmsModel({
      //id: empId,
      pk: "emp_" + empId,
      sk: "emp_prof_" + empId,
      fullname: req.body.fullname,
      emp_id: empId,
      dob: req.body.dob,
      position: req.body.position,
    });

    employee
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "POST /employees",
          createdEmployee: employee,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },
  updateEmployeAttributes:(req, res, next) => {
    const empAttributes = req.body;
    //const empId = req.params.empId;
  
    EmsModel.update(
      { pk: req.params.pk, sk: req.params.sk },
      empAttributes,
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: err });
        } else {
          console.log(result);
          res.status(200).json({
            message: "empAttributes added",
            result: result,
          });
        }
      }
    );
  },
  associateVehicleToEmployee:(req, res, next) => {
    const vehicleAttributes = req.body;
    //const empId = req.params.empId;
  
    EmsModel.update(
      { pk: req.params.pk, sk: req.params.sk },
      vehicleAttributes,
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: err });
        } else {
          console.log(result);
          res.status(200).json({
            message: "vehicleAttributes associated",
            result: result,
          });
        }
      }
    );
  },
  deleteEmployee : (req, res, next) => {
    EmsModel.delete({ pk: req.params.pk, sk: req.params.sk }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "employee deleted",
        });
      }
    });
  },
  findEmployeByPhone: (req, res, next) => {
    
    console.log("test");
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName: "ems_model",
        ProjectionExpression: "emp_id, fullname, #ph, #em",
        FilterExpression: "phone = :ph",
        ExpressionAttributeNames: {
            "#ph": "phone",
            "#em":"email"
        },
        ExpressionAttributeValues: {
             ":ph": req.params.phone,
             
        }
    };
    
    
    docClient.scan(params, onScan);
    
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            res.send("unable to find");
        } else {
            // print all the movies
            console.log("Scan succeeded.");
            data.Items.forEach(function(emp) {
               console.log(emp);
               res.send(emp);
            });
    
            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
    }
    
  },
  findEmployeByEmail: (req, res, next) => {
    
    console.log("test");
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName: "ems_model",
        ProjectionExpression: "emp_id, fullname, #ph, #em",
        FilterExpression: "email = :em",
        ExpressionAttributeNames: {
            "#ph": "phone",
            "#em":"email"
        },
        ExpressionAttributeValues: {
             ":em": req.params.email,
             
        }
    };
    
    
    docClient.scan(params, onScan);
    
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            res.send("unable to find");
        } else {
            // print all the movies
            console.log("Scan succeeded.");
            data.Items.forEach(function(emp) {
               console.log(emp);
               res.send(emp);
            });
    
            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
    }
    
  },
};