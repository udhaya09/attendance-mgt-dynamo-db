const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const EmsModel = require("../model/emsModel");

module.exports = {
    createEntryAccessForEmployee: (req, res) => {
     
      const eaChannel = new EmsModel({
        //id: empId,
        pk: "emp_" + req.body.emp_id,
        sk: "ea_" + req.body.ea_type + "_" + req.body.ea_id,
        ea_description: req.body.ea_description,
        ea_id: req.body.ea_id   
      });
      eaChannel
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            // message: "POST /employees",
            result: eaChannel,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    },
    
  };