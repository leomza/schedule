export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead } from '../middleware/userCookie';

//I import the function of the Controlers that Im going to use here
import { createTask, getAllTasks, deleteTask, getATask, editTask } from '../controllers/controllerTasks';
import { sendEmail, sendWhatsApp } from '../middleware/sendEmail';

router.post('/newTask', userCookieRead, createTask);
router.post('/sendEmail/:typeButton', sendEmail, sendWhatsApp);
router.get('/getAllTasks', userCookieRead, getAllTasks);
router.get('/findTask/:idTask', userCookieRead, getATask);
router.delete('/deleteTask/:idTask/:idProject', userCookieRead, deleteTask);
router.put('/editTask/:idTask', userCookieRead, editTask);

module.exports = router;