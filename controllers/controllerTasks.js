"use strict";
exports.__esModule = true;
exports.getATask = exports.deleteTask = exports.getAllTasks = exports.createTask = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var modelTasks_1 = require("../models/modelTasks");
var modelProjects_1 = require("../models/modelProjects");
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
function getAllTasks(req, res) {
    try {
        var allTasks = new modelTasks_1.Tasks();
        res.send({ message: "Information of the tasks", allTasks: allTasks });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.getAllTasks = getAllTasks;
function deleteTask(req, res) {
    try {
        var _a = req.params, idTask_1 = _a.idTask, idProject = _a.idProject;
        //Delete the task from the project
        var allProjects = new modelProjects_1.Projects();
        var foundProject = allProjects.findProjectByUuid(idProject);
        foundProject.tasks = foundProject.tasks.filter(function (task) { return task = idTask_1; });
        allProjects.updateProjectsJson();
        //Delete the task
        var allTasks = new modelTasks_1.Tasks();
        allTasks.deleteTask(idTask_1);
        res.send({ message: "The task was deleted", allTasks: allTasks });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.deleteTask = deleteTask;
function getATask(req, res) {
    try {
        var idTask = req.params.idTask;
        var allTasks = new modelTasks_1.Tasks();
        var foundTask = allTasks.findTaskById(idTask);
        res.send({ message: "The task was founded", foundTask: foundTask });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.getATask = getATask;
