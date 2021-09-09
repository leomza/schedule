"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
//I import the function of the Controlers that Im going to use here
var controllerTasks_1 = require("../controllers/controllerTasks");
router.post('/newTask', userCookie_1.userCookieRead, controllerTasks_1.createTask);
router.get('/getAllTasks', userCookie_1.userCookieRead, controllerTasks_1.getAllTasks);
router.get('/findTask/:idTask', userCookie_1.userCookieRead, controllerTasks_1.getATask);
router["delete"]('/deleteTask/:idTask/:idProject', userCookie_1.userCookieRead, controllerTasks_1.deleteTask);
router.put('/editTask/:idTask', userCookie_1.userCookieRead, controllerTasks_1.editTask);
module.exports = router;
