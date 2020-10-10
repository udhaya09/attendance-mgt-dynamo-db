var AWS = require("aws-sdk");
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  aws_access_key_id: "AKIAZTMTSMHZZBDRNBUX",
  aws_secret_access_key: "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",
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985." + process.env.AWS_DB_ACCESS_KEY + process.env.AWS_DB_SECRET_KEY);

var params = {
    TableName : "ems_data_model",
    IndexName: "admin-login",
    KeyConditionExpression: "#fn = :fname",
    ExpressionAttributeNames:{
        "#fn": "username"
    },
    ExpressionAttributeValues: {
        ":fname": "admin"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});