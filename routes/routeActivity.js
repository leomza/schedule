"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Controlers that Im going to use here
var controllerActivity_1 = require("../controllers/controllerActivity");
router.get('/infoActivity', controllerActivity_1.getActivities);
router.post('/setActivity', controllerActivity_1.newActivity);
module.exports = router;
