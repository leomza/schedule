export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieWrite } from '../middleware/userCookie';
import { doesUserExistLogin } from '../middleware/doesUserExist';

//I import the function of the Controlers that Im going to use here
import { login } from '../controllers/controllerUsers'

router.post('/login', doesUserExistLogin, userCookieWrite, login);

module.exports = router;