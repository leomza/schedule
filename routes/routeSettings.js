"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
//I import the function of the Controlers that Im going to use here
var controllerSettings_1 = require("../controllers/controllerSettings");
router.get('/getGeneralTimeInformation', userCookie_1.userCookieRead, controllerSettings_1.getGeneralTimeInformation);
router.put('/editGeneralSettings', userCookie_1.userCookieRead, controllerSettings_1.editGeneralSettings);
module.exports = router;
