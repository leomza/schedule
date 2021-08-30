"use strict";
exports.__esModule = true;
exports.Projects = exports.Project = void 0;
var modelClients_1 = require("./modelClients");
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var projectsJsonPath = path.resolve(__dirname, "./projects.json");
//Function to read the JSON of created projects
var readJsonProjects = function () {
    try {
        var projects = fs.readFileSync(projectsJsonPath);
        return JSON.parse(projects);
    }
    catch (error) {
        console.error(error);
    }
};
var Project = /** @class */ (function () {
    function Project(projectName, client, allottedTime) {
        this.uuid = uuidv4();
        this.projectName = projectName;
        this.client = new modelClients_1.Client(null, null, null, null);
        this.allottedTime = allottedTime;
        this.createdDate = Date.now();
    }
    return Project;
}());
exports.Project = Project;
var Projects = /** @class */ (function () {
    function Projects() {
        this.projects = readJsonProjects();
    }
    Projects.prototype.updateProjectsJson = function () {
        try {
            fs.writeFileSync(projectsJsonPath, JSON.stringify(this.projects));
        }
        catch (error) {
            console.error(error);
        }
    };
    Projects.prototype.createProject = function (project) {
        try {
            this.projects.push(project);
            this.updateProjectsJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    Projects.prototype.findProjectByUuid = function (id) {
        try {
            var projectFound = this.projects.find(function (project) { return project.uuid === id; });
            return projectFound;
        }
        catch (error) {
            console.error(error);
        }
    };
    Projects.prototype.deleteProject = function (id) {
        try {
            this.projects = this.projects.filter(function (project) { return project.uuid !== id; });
            this.updateProjectsJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    return Projects;
}());
exports.Projects = Projects;
