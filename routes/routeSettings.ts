export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead } from '../middleware/userCookie';

//I import the function of the Controlers that Im going to use here
import { getGeneralTimeInformation, editGeneralSettings } from '../controllers/controllerSettings'

router.get('/getGeneralTimeInformation', userCookieRead, getGeneralTimeInformation);
router.put('/editGeneralSettings', userCookieRead, editGeneralSettings);

module.exports = router;