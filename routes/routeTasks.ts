export { };
const express = require('express');
const router = express.Router();

//I import the function of the Controlers that Im going to use here
import { createTask } from '../controllers/controllerTasks';

router.post('/newTask', createTask);

module.exports = router;