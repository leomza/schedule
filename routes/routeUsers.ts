export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieWrite } from '../middleware/userCookie';
import { doesUserExistLogin } from '../middleware/doesUserExist';

//I import the function of the Controlers that Im going to use here
import { login, saveTimeUser, timeInformation, deleteTimeInformation } from '../controllers/controllerUsers';

router.post('/login', doesUserExistLogin, userCookieWrite, login);
router.post('/saveTime', saveTimeUser);
router.get('/checkTime/:userEmail', timeInformation);
router.delete('/previousClock/:userEmail', deleteTimeInformation);

module.exports = router;