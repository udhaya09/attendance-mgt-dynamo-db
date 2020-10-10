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
    
  },
  
  {
    saveUnknown: true,
  }
);

module.exports = dynamoose.model("ems_model", emsSchema);
