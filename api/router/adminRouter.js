const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");

const { createAdminUser } = require("../controller/adminController");
//const { findAdminUserByKeys } = require("../controller/adminController");

//creating new admin user
router.post("/", createAdminUser);

//get particular admin based on department and admin (pk and sk)
//router.get("/:pk", findAdminUserByKeys);

//get all admins
router.get("/", (req, res, next) => {
  Admin.scan()
    .all()
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({ message: "No entries found" });
      }
    })
    .catch((err) => {
      console.log(error, err);
      res.status(500).json({ error: err });
    });
});

//updating an admin based on pk and sk
router.patch("/:pk", (req, res, next) => {
  const admAttr = req.body;
  //const empId = req.params.empId;

  Admin.update({ pk: req.params.pk }, admAttr, (error, admin) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: err });
    } else {
      console.log(admin);
      res.status(200).json({
        message: "admin updated",
        info: admin,
      });
    }
  });
});

//deleting admin
router.delete("/:pk", (req, res, next) => {
  Admin.delete({ pk: req.params.pk }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({
        message: "admin deleted",
      });
    }
  });
});

module.exports = router;
