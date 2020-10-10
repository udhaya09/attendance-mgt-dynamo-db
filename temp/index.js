const { v4: uuidv4 } = require("uuid");
const dynamoose = require("dynamoose");

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
});

const fs = require("fs");
const express = require("express");
var app = express();

const bodyparsr = require("body-parser");
app.use(bodyparsr.json());

app.listen(8083, () => console.log("running on 8083"));

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const adminId = uuidv4();

console.log("adminId: " + adminId);

////////////////////

/////////////////////

//Insert single admin user
app.post("/create-admin-user", (req, res) => {
  let adminUser = req.body;
  var params = {
    TableName: "admin_user",
    Item: {
      PK: "ADM#" + adminId,
      SK: "#ADMPROF#" + adminId,
      username: adminUser.username,
      password: adminUser.password,
      fullname: adminUser.fullname,
    },
  };
  console.log("Adding a new item... ");
  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.send(
        "Unable to add item. Error JSON:" + JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.send("Added item:" + JSON.stringify(data, null, 2));
    }
  });
});

//Insert single admin user - orm
app.post("/create-admin-user-orm", (req, res) => {
  let adminUser = req.body;

  const AdminUser = dynamoose.model("admin_user", {
    PK: String,
    SK: String,
    username: String,
    password: String,
    fullname: String,
  });

  const newUser = new AdminUser({
    PK: "ADM#" + adminId,
    SK: "#ADMPROF#" + adminId,
    username: adminUser.username,
    password: adminUser.password,
    fullname: adminUser.fullname,
  });

  newUser.save((error) => {
    if (error) {
      console.error(error);
      res.send(error);
    } else {
      console.log("Save operation was successful.");
      res.send("Save operation was successful.");
    }
  });
});
