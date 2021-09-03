"use strict";

exports.__esModule = true;

var express = require('express');

var router = express.Router(); //I import the function of the Controlers that Im going to use here

var controllerProjects_1 = require("../controllers/controllerProjects");

router.post('/addNew', controllerProjects_1.registerProject);
router.get('/getAllProjects', controllerProjects_1.getAllProjects);
router.get('/findProject/:idProject', controllerProjects_1.getAProject);
router["delete"]('/deleteProject/:idProject', controllerProjects_1.deleteProject);
router.put('/editProject/:idProject', controllerProjects_1.editProject);
module.exports = router;