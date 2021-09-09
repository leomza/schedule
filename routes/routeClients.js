"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
//I import the function of the Middlewares that I going to use here
var userCookie_1 = require("../middleware/userCookie");
//I import the function of the Controlers that Im going to use here
var controllerClients_1 = require("../controllers/controllerClients");
router.post('/register', userCookie_1.userCookieRead, controllerClients_1.registerClient);
router.get('/getAllClients', userCookie_1.userCookieRead, controllerClients_1.getAllClients);
router.get('/findClient/:idClient', userCookie_1.userCookieRead, controllerClients_1.getAClient);
router["delete"]('/deleteClient/:idClient', userCookie_1.userCookieRead, controllerClients_1.deleteClient);
router.put('/editClient/:idClient', userCookie_1.userCookieRead, controllerClients_1.editClient);
router.post('/setTimeInClient/:idProject/:typeOfButton', userCookie_1.userCookieRead, controllerClients_1.setClientTime);
module.exports = router;
