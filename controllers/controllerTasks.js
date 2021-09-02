"use strict";
exports.__esModule = true;
exports.createTask = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var modelTasks_1 = require("../models/modelTasks");
function createTask(req, res) {
    try {
        var _a = req.body, taskName = _a.taskName, description = _a.description, limitDate = _a.limitDate, projectId = _a.projectId;
        var newTask = new modelTasks_1.Task(taskName, description, limitDate, projectId);
        var allTasks = new modelTasks_1.Tasks();
        allTasks.createTask(newTask);
        res.send({ message: "A new Task was register", newTask: newTask, allTasks: allTasks });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.createTask = createTask;
