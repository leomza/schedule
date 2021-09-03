"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Controlers that Im going to use here
var controllerTasks_1 = require("../controllers/controllerTasks");
router.post('/newTask', controllerTasks_1.createTask);
router.get('/getAllTasks', controllerTasks_1.getAllTasks);
router.get('/findTask/:idTask', controllerTasks_1.getATask);
router["delete"]('/deleteTask/:idTask/:idProject', controllerTasks_1.deleteTask);
router.put('/editTask/:idTask', controllerTasks_1.editTask);
module.exports = router;
