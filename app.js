const express = require("express");
const morganLog = require("morgan");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const dynamoose = require("dynamoose");
const AWS = require("aws-sdk");

const app = express();

AWS.config.update({
  region: process.env.AWS_DB_REGION,
  aws_access_key_id: process.env.AWS_DB_ACCESS_KEY,
  aws_secret_access_key: process.env.AWS_DB_SECRET_KEY,
  // region: "local",
  //aws_access_key_id: "ky0iax",
  // aws_secret_access_key: "qr8x5",
  // endpoint: "http://localhost:8000",
});

app.use(morganLog("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* mongoose
  .connect("mongodb://localhost:27017/eims_db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection is successful!"))
  .catch((err) => console.log(`Error in connecting Mongo DB is ${err}`)); */

/* app.use((req, res, next) => {
  res.header("Access=Control=Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
}); */

const employeeRoutes = require("./api/router/employeeRouter");
const adminRoutes = require("./api/router/adminRouter");
const loginRoutes = require("./api/router/loginRouter");
const departmentRoutes = require("./api/router/departmentRouter");
const entryAccessRoutes = require("./api/router/entryAccessRouter");
const attendanceRoutes = require("./api/router/attendanceRouter");

console.log("application started, running on " + process.env.APP_PORT);

/* app.use((req, res, next) => {
  res.status(200).json({
    message: "hello world!",
  });
}); */

app.use("/api/employee", employeeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/entry-access", entryAccessRoutes);
app.use("/api/attendance", attendanceRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
