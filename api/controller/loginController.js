const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const jwt = require("jsonwebtoken");
const accessTokenSecret = "prakash";

const users = [
  {
    username: "john",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "anna",
    password: "password123member",
    role: "member",
  },
];

const books = [
  {
      "author": "Chinua Achebe",
      "country": "Nigeria",
      "language": "English",
      "pages": 209,
      "title": "Things Fall Apart",
      "year": 1958
  },
  {
      "author": "Hans Christian Andersen",
      "country": "Denmark",
      "language": "Danish",
      "pages": 784,
      "title": "Fairy tales",
      "year": 1836
  },
  {
      "author": "Dante Alighieri",
      "country": "Italy",
      "language": "Italian",
      "pages": 928,
      "title": "The Divine Comedy",
      "year": 1315
  },
];



module.exports = {
  userAuthentication: (req, res) => {

    console.log("test");
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = users.find((u) => {
      return u.username === username && u.password === password;
    });

    if (user) {
      // Generate an access token
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        accessTokenSecret
      );

      res.json({
        accessToken,
      });
    } else {
      res.send("Username or password incorrect");
    }
  },
  getBooks: (req, res) => {
    res.json(books);
  },
  adminUserAuthentication: (req, res, next) => {
    
    console.log("test");
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName: "ems_model",
        ProjectionExpression: "emp_id",
        FilterExpression: "username = :em",
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
