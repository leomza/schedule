"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
//I import the function of the Controlers that Im going to use here
var controllerProjects_1 = require("../controllers/controllerProjects");
router.post('/addNew', userCookie_1.userCookieRead, controllerProjects_1.registerProject);
router.post('/addTask', userCookie_1.userCookieRead, controllerProjects_1.addTask);
router.get('/getAllProjects', userCookie_1.userCookieRead, controllerProjects_1.getAllProjects);
router.get('/findProject/:idProject', userCookie_1.userCookieRead, controllerProjects_1.getAProject);
router["delete"]('/deleteProject/:idProject', userCookie_1.userCookieRead, controllerProjects_1.deleteProject);
router.put('/editProject/:idProject', userCookie_1.userCookieRead, controllerProjects_1.editProject);
router.put('/resetRetailerInfo/:idProject', userCookie_1.userCookieRead, controllerProjects_1.resetRetailerInfo);
router.post('/setTimeInProject/:idProject/:timeInHours/:typeOfButton', userCookie_1.userCookieRead, controllerProjects_1.setProjectTime);
module.exports = router;
