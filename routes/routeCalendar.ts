export { };
const express = require('express');
const router = express.Router();

//I import the function of the Controlers that Im going to use here
import { insertEvent, getAllEvents } from '../controllers/controllerGoogleCalendar'

router.post('/createEvent', insertEvent);
router.post('/getAllEvents', getAllEvents);

module.exports = router;