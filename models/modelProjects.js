"use strict";
exports.__esModule = true;
exports.Project = void 0;
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
    projectType["all"] = "all";
})(projectType || (projectType = {}));
var Project = /** @class */ (function () {
    function Project(projectUuid, projectName, clientId, projectType, status, totalHours) {
        this.projectUuid = projectUuid;
        this.projectName = projectName;
        this.clientId = clientId;
        this.projectType = projectType;
        this.status = status;
        this.createdDate = Date.now();
        this.totalHours = totalHours;
        this.usedHours = 0;
        this.timeInDesign = 0;
        this.tasks = [];
    }
    return Project;
}());
exports.Project = Project;
