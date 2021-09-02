export { };
const express = require('express');
const router = express.Router();

//I import the function of the Controlers that Im going to use here
import { registerProject, getAllProjects, getAProject, deleteProject, editProject, addTask } from '../controllers/controllerProjects'

router.post('/addNew', registerProject);
router.post('/addTask/:idTask/:idProject', addTask);
router.get('/getAllProjects', getAllProjects);
router.get('/findProject/:idProject', getAProject);
router.delete('/deleteProject/:idProject', deleteProject);
router.put('/editProject/:idProject', editProject);

module.exports = router;