export { };
const express = require('express');
const router = express.Router();

//I import the function of the Controlers that Im going to use here
import { registerClient, getAllClients, getAClient, deleteClient, editClient } from '../controllers/controllerClients'

router.post('/register', registerClient);
router.get('/getAllClients', getAllClients);
router.get('/findClient/:idClient', getAClient);
router.delete('/deleteClient/:idClient', deleteClient);
router.put('/editClient/:idClient', editClient);

module.exports = router;