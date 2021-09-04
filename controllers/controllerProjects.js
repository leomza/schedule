"use strict";
exports.__esModule = true;
exports.setProjectTime = exports.addTask = exports.getAProject = exports.editProject = exports.deleteProject = exports.getAllProjects = exports.registerProject = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var modelProjects_1 = require("../models/modelProjects");
function registerProject(req, res) {
    try {
        var _a = req.body, projectName = _a.projectName, clientId = _a.clientId, projectType = _a.projectType, status = _a.status, totalHours = _a.totalHours;
        var newProject = new modelProjects_1.Project(projectName, clientId, projectType, status, totalHours);
        var allProjects = new modelProjects_1.Projects();
        allProjects.createProject(newProject);
        res.send({ message: "A new Project was register", allProjects: allProjects });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.registerProject = registerProject;
function getAllProjects(req, res) {
    try {
        var allProjects = new modelProjects_1.Projects();
        res.send({ message: "Information of the projects", allProjects: allProjects });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.getAllProjects = getAllProjects;
function deleteProject(req, res) {
    try {
        var idProject = req.params.idProject;
        var allProjects = new modelProjects_1.Projects();
        allProjects.deleteProject(idProject);
        res.send({ message: "The project was deleted", allProjects: allProjects });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.deleteProject = deleteProject;
function editProject(req, res) {
    try {
        var idProject = req.params.idProject;
        var _a = req.body, projectName = _a.projectName, clientId = _a.clientId, projectType = _a.projectType, status = _a.status, totalHours = _a.totalHours;
        var allProjects = new modelProjects_1.Projects();
        var foundProject = allProjects.findProjectByUuid(idProject);
        foundProject.projectName = projectName;
        foundProject.clientId = clientId;
        foundProject.projectType = projectType;
        foundProject.status = status;
        foundProject.totalHours = totalHours;
        allProjects.updateProjectsJson();
        res.send({ message: "The project was updated", allProjects: allProjects });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.editProject = editProject;
function getAProject(req, res) {
    try {
        var idProject = req.params.idProject;
        var allProjects = new modelProjects_1.Projects();
        var foundProject = allProjects.findProjectByUuid(idProject);
        res.send({ message: "The project was founded", foundProject: foundProject });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.getAProject = getAProject;
function addTask(req, res) {
    try {
        var _a = req.body, uuid = _a.uuid, idProject = _a.idProject;
        var allProjects = new modelProjects_1.Projects();
        var foundProject = allProjects.findProjectByUuid(idProject);
        foundProject.tasks.push(uuid);
        allProjects.updateProjectsJson();
        res.send({ message: "The task was added to the project", allProjects: allProjects });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.addTask = addTask;
function setProjectTime(req, res) {
    try {
        var _a = req.params, idProject = _a.idProject, timeInHours = _a.timeInHours;
        var allProjects = new modelProjects_1.Projects();
        var foundProject = allProjects.findProjectByUuid(idProject);
        timeInHours = parseFloat(timeInHours);
        foundProject.usedHours = foundProject.usedHours + timeInHours;
        allProjects.updateProjectsJson();
        res.send({ message: "The time was added to the project" });
    }
    catch (error) {
        console.error(error);
    }
}
exports.setProjectTime = setProjectTime;
