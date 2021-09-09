export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead } from '../middleware/userCookie';

//I import the function of the Controlers that Im going to use here
import { registerClient, getAllClients, getAClient, deleteClient, editClient, setClientTime } from '../controllers/controllerClients'

router.post('/register', userCookieRead, registerClient);
router.get('/getAllClients', userCookieRead, getAllClients);
router.get('/findClient/:idClient', userCookieRead, getAClient);
router.delete('/deleteClient/:idClient', userCookieRead, deleteClient);
router.put('/editClient/:idClient', userCookieRead, editClient);
router.post('/setTimeInClient/:idProject/:typeOfButton', userCookieRead, setClientTime);

module.exports = router;