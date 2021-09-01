"use strict";
exports.__esModule = true;
exports.getAProject = exports.editProject = exports.deleteProject = exports.getAllProjects = exports.registerProject = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var modelProjects_1 = require("../models/modelProjects");
function registerProject(req, res) {
    try {
        var _a = req.body, projectName = _a.projectName, clientId = _a.clientId, task = _a.task, status = _a.status, totalHours = _a.totalHours;
        var newProject = new modelProjects_1.Project(projectName, clientId, task, status, totalHours);
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
        var _a = req.body, projectName = _a.projectName, clientId = _a.clientId, task = _a.task, status = _a.status, totalHours = _a.totalHours;
        var allProjects = new modelProjects_1.Projects();
        var foundProject = allProjects.findProjectByUuid(idProject);
        foundProject.projectName = projectName;
        foundProject.clientId = clientId;
        foundProject.task = task;
        foundProject.status = status;
        foundProject.totalHours = totalHours;
        allProjects.updateProjectsJson();
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
    }
}
exports.getAProject = getAProject;
