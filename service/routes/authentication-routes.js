const express = require("express");

const authenticationControllers = require("../controllers/authentication-controllers");

const router = express.Router();

router.post("/signup", authenticationControllers.signup);

router.post("/login", authenticationControllers.login);

module.exports = router;
