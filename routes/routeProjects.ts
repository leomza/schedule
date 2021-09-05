export { };
const express = require('express');
const router = express.Router();

//I import the function of the Controlers that Im going to use here
import { registerProject, getAllProjects, getAProject, deleteProject, editProject, addTask, setProjectTime } from '../controllers/controllerProjects'

router.post('/addNew', registerProject);
router.post('/addTask', addTask);
router.get('/getAllProjects', getAllProjects);
router.get('/findProject/:idProject', getAProject);
router.delete('/deleteProject/:idProject', deleteProject);
router.put('/editProject/:idProject', editProject);
router.post('/setTimeInProject/:idProject/:timeInHours/:typeOfButton', setProjectTime);

module.exports = router;