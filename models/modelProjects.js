"use strict";
exports.__esModule = true;
exports.Projects = exports.Project = void 0;
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
var Status;
(function (Status) {
    Status["offerPending"] = "offerPending";
    Status["inProgress"] = "inProgress";
    Status["offerApproved"] = "offerApproved";
    Status["stuck"] = "stuck";
    Status["paidUp"] = "paidUp";
    Status["waitingForSketchApproval"] = "waitingForSketchApproval";
    Status["postponed"] = "postponed";
    Status["canceled"] = "canceled";
    Status["finished"] = "finished";
})(Status || (Status = {}));
var projectType;
(function (projectType) {
    projectType["logo"] = "logo";
    projectType["graphicLanguage"] = "graphicLanguage";
    projectType["corporateWebsite"] = "corporateWebsite";
    projectType["landingPage"] = "landingPage";
    projectType["ecommerce"] = "ecommerce";
    projectType["branding"] = "branding";
    projectType["post"] = "post";
    projectType["packageDesign"] = "packageDesign";
    projectType["banner"] = "banner";
    projectType["rollUp"] = "rollUp";
    projectType["flyer"] = "flyer";
    projectType["digitalBook"] = "digitalBook";
    projectType["newsLetter"] = "newsLetter";
    projectType["calendar"] = "calendar";
    projectType["businessCard"] = "businessCard";
    projectType["presentation"] = "presentation";
    projectType["designedPage"] = "designedPage";
})(projectType || (projectType = {}));
var Project = /** @class */ (function () {
    function Project(projectName, clientId, projectType, status, totalHours) {
        this.projectUuid = uuidv4();
        this.projectName = projectName;
        this.clientId = clientId;
        this.projectType = projectType;
        this.status = status;
        this.createdDate = Date.now();
        this.totalHours = totalHours;
        this.usedHours = 0;
        this.tasks = [];
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
            var projectFound = this.projects.find(function (project) { return project.projectUuid === id; });
            return projectFound;
        }
        catch (error) {
            console.error(error);
        }
    };
    Projects.prototype.deleteProject = function (id) {
        try {
            this.projects = this.projects.filter(function (project) { return project.projectUuid !== id; });
            this.updateProjectsJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    return Projects;
}());
exports.Projects = Projects;
