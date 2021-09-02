"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Controlers that Im going to use here
var controllerTasks_1 = require("../controllers/controllerTasks");
router.post('/newTask', controllerTasks_1.createTask);
module.exports = router;
