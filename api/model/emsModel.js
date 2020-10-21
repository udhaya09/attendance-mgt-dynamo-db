const dynamoose = require("dynamoose");

const emsSchema = new dynamoose.Schema(
  {
    pk: {
      type: String,
      hashKey: true,
    },
    sk: {
      type: String,
      rangeKey: true,
    },

    emp_info: {
      type: String,
      index: {
        hashKey: true,
        rangeKey: "sk",
        name: "employee-info",
        global: "true",
        project: ["emp_id", "firstName", "lastName", "shift", "department"],
      },
    },
    username: {
      type: String,
      index: {
        hashKey: true,
        name: "admin-login",
        rangeKey: "sk",
        global: "true",
        project: ["roles", "permissions", "password"],
      },
    },
    ea_id: {
      type: String,
    },
    ea_type: {
      type: String,
      index: {
        name: "entry-access",
        hashKey: true,
        rangeKey: "ea_id",
        global: "true",
        project: ["emp_id"],
      },
    },
  },

  {
    saveUnknown: true,
  }
);

module.exports = dynamoose.model("ems_model", emsSchema);
