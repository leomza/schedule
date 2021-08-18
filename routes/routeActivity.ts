export { };
const express = require('express');
const router = express.Router();

//I import the function of the Controlers that Im going to use here
import { newActivity, getActivities } from '../controllers/controllerActivity'

router.get('/infoActivity', getActivities);
router.post('/setActivity', newActivity);

module.exports = router;