"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Controlers that Im going to use here
var controllerClients_1 = require("../controllers/controllerClients");
router.post('/register', controllerClients_1.registerClient);
router.get('/getAllClients', controllerClients_1.getAllClients);
router.get('/findClient/:idClient', controllerClients_1.getAClient);
router["delete"]('/deleteClient/:idClient', controllerClients_1.deleteClient);
router.put('/editClient/:idClient', controllerClients_1.editClient);
router.post('/setTimeInClient/:idProject/:typeOfButton', controllerClients_1.setClientTime);
module.exports = router;
