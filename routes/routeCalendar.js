"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Controlers that Im going to use here
var controllerGoogleCalendar_1 = require("../controllers/controllerGoogleCalendar");
router.post('/createEvent', controllerGoogleCalendar_1.insertEvent);
router.post('/getAllEvents', controllerGoogleCalendar_1.getAllEvents);
module.exports = router;
