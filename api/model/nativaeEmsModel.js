var AWS = require("aws-sdk");


AWS.config.update({
  region: "us-east-2",
  aws_access_key_id: "AKIAZTMTSMHZZBDRNBUX",
  aws_secret_access_key: "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",
});

console.log("test");
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "ems_model",
    ProjectionExpression: "fullname, #r, #pos",
    FilterExpression: "username = :username",
    ExpressionAttributeNames: {
        "#pos": "position",
        "#r":"roles"
    },
    ExpressionAttributeValues: {
         ":username": "admin",
         
    }
};


docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(admin) {
           console.log(
                admin.fullname + " | " +   admin.roles);
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
/* var docClient = new AWS.DynamoDB.DocumentClient();

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
}); */