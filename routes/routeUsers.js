"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
var doesUserExist_1 = require("../middleware/doesUserExist");
//I import the function of the Controlers that Im going to use here
var controllerUsers_1 = require("../controllers/controllerUsers");
router.post('/login', doesUserExist_1.doesUserExistLogin, userCookie_1.userCookieWrite, controllerUsers_1.login);
router.post('/saveTime', controllerUsers_1.saveTimeUser);
router.get('/checkTime/:userEmail', controllerUsers_1.timeInformation);
router["delete"]('/previousClock/:userEmail', controllerUsers_1.deleteTimeInformation);
module.exports = router;
