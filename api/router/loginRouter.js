const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const customId = require("custom-id");
const dynamoose = require("dynamoose");


const jwt = require("jsonwebtoken");
const accessTokenSecret = "prakash";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


const { userAuthentication } = require("../controller/loginController");

const {getBooks} = require("../controller/loginController")

const {adminUserAuthentication} = require("../controller/loginController")

router.post("/", userAuthentication);

router.post("/", adminUserAuthentication);

router.get("/", authenticateJWT, getBooks);


module.exports = router;

