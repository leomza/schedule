"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.setProjectTime = exports.addTask = exports.getAProject = exports.editProject = exports.deleteProject = exports.getAllProjects = exports.registerProject = void 0;
var uuidv4 = require("uuid").v4;
//This is to iniitializate Firebase
var admin = require('firebase-admin');
var db = admin.firestore();
var projectsDb = db.collection('projects');
function registerProject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, projectName, clientId, projectType, status, totalHours, id, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, projectName = _a.projectName, clientId = _a.clientId, projectType = _a.projectType, status = _a.status, totalHours = _a.totalHours;
                    id = uuidv4();
                    return [4 /*yield*/, projectsDb.doc(id).set({
                            projectName: projectName,
                            clientId: clientId,
                            projectType: projectType,
                            status: status,
                            totalHours: totalHours,
                            projectUuid: id,
                            createdDate: Date.now(),
                            usedHours: 0,
                            timeInDesign: 0,
                            tasks: []
                        })];
                case 1:
                    _b.sent();
                    res.send({ message: "A new Project was register" });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error(error_1);
                    res.status(500).send(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.registerProject = registerProject;
function getAllProjects(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var infoProjects_1, allProjects, projects, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    infoProjects_1 = [];
                    allProjects = db.collection('projects');
                    return [4 /*yield*/, allProjects.get()];
                case 1:
                    projects = _a.sent();
                    projects.forEach(function (doc) {
                        infoProjects_1.push(doc.data());
                    });
                    res.send({ message: "Information of the projects", infoProjects: infoProjects_1 });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    res.status(500).send(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllProjects = getAllProjects;
function deleteProject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idProject, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    idProject = req.params.idProject;
                    return [4 /*yield*/, db.collection('projects').doc(idProject)["delete"]()];
                case 1:
                    _a.sent();
                    res.send({ message: "The project was deleted" });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    res.status(500).send(error_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteProject = deleteProject;
function editProject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idProject, _a, projectName, clientId, projectType, status, totalHours, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    idProject = req.params.idProject;
                    _a = req.body, projectName = _a.projectName, clientId = _a.clientId, projectType = _a.projectType, status = _a.status, totalHours = _a.totalHours;
                    return [4 /*yield*/, db.collection('projects').doc(idProject).set({
                            projectName: projectName,
                            clientId: clientId,
                            projectType: projectType,
                            status: status,
                            totalHours: totalHours
                        }, { merge: true })];
                case 1:
                    _b.sent();
                    res.send({ message: "The project was updated" });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    console.error(error_4);
                    res.status(500).send(error_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.editProject = editProject;
function getAProject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idProject, project, foundProject, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    idProject = req.params.idProject;
                    return [4 /*yield*/, db.collection('projects').doc(idProject).get()];
                case 1:
                    project = _a.sent();
                    foundProject = project.data();
                    res.send({ message: "The project was founded", foundProject: foundProject });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error(error_5);
                    res.status(500).send(error_5.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAProject = getAProject;
function addTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, uuid, idProject, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, uuid = _a.uuid, idProject = _a.idProject;
                    return [4 /*yield*/, db.collection('projects').doc(idProject).set({
                            tasks: admin.firestore.FieldValue.arrayUnion(uuid)
                        }, { merge: true })];
                case 1:
                    _b.sent();
                    res.send({ message: "The task was added to the project" });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    console.error(error_6);
                    res.status(500).send(error_6.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addTask = addTask;
function setProjectTime(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idProject, timeInHours, typeOfButton, project, foundProject, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.params, idProject = _a.idProject, timeInHours = _a.timeInHours, typeOfButton = _a.typeOfButton;
                    return [4 /*yield*/, db.collection('projects').doc(idProject).get()];
                case 1:
                    project = _b.sent();
                    foundProject = project.data();
                    timeInHours = parseFloat(timeInHours);
                    return [4 /*yield*/, db.collection('projects').doc(idProject).set({
                            usedHours: foundProject.usedHours + timeInHours
                        }, { merge: true })];
                case 2:
                    _b.sent();
                    if (!(typeOfButton === 'design')) return [3 /*break*/, 4];
                    return [4 /*yield*/, db.collection('projects').doc(idProject).set({
                            timeInDesign: foundProject.timeInDesign + timeInHours
                        }, { merge: true })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    res.send({ message: "The time was added to the project" });
                    return [3 /*break*/, 6];
                case 5:
                    error_7 = _b.sent();
                    console.error(error_7);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.setProjectTime = setProjectTime;
