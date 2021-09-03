export { };
const express = require('express');
const router = express.Router();

//I import the function of the Controlers that Im going to use here
import { createTask, getAllTasks, deleteTask, getATask, editTask } from '../controllers/controllerTasks';

router.post('/newTask', createTask);
router.get('/getAllTasks', getAllTasks);
router.get('/findTask/:idTask', getATask);
router.delete('/deleteTask/:idTask/:idProject', deleteTask);
router.put('/editTask/:idTask', editTask);

module.exports = router;