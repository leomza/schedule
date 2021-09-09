export { };
const express = require('express');
const router = express.Router();

//I import the function of the Middlewares that I going to use here
import { userCookieRead } from '../middleware/userCookie';

//I import the function of the Controlers that Im going to use here
import { registerProject, getAllProjects, getAProject, deleteProject, editProject, addTask, setProjectTime } from '../controllers/controllerProjects'

router.post('/addNew', userCookieRead, registerProject);
router.post('/addTask', userCookieRead, addTask);
router.get('/getAllProjects', userCookieRead, getAllProjects);
router.get('/findProject/:idProject', userCookieRead, getAProject);
router.delete('/deleteProject/:idProject', userCookieRead, deleteProject);
router.put('/editProject/:idProject', userCookieRead, editProject);
router.post('/setTimeInProject/:idProject/:timeInHours/:typeOfButton', userCookieRead, setProjectTime);

module.exports = router;