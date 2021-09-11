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
exports.editTask = exports.getATask = exports.deleteTask = exports.getAllTasks = exports.createTask = void 0;
var uuidv4 = require("uuid").v4;
//This is to iniitializate Firebase
var admin = require('firebase-admin');
var db = admin.firestore();
var tasksDb = db.collection('tasks');
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, taskName, description, limitDate, projectId, id, newTask, task, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, taskName = _a.taskName, description = _a.description, limitDate = _a.limitDate, projectId = _a.projectId;
                    id = uuidv4();
                    return [4 /*yield*/, tasksDb.doc(id).set({
                            uuid: id,
                            taskName: taskName,
                            description: description,
                            limitDate: limitDate,
                            createdDate: Date.now(),
                            projectId: projectId
                        })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, db.collection('tasks').doc(id).get()];
                case 2:
                    newTask = _b.sent();
                    task = newTask.data();
                    res.send({ message: "A new Task was register", task: task });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1);
                    res.status(500).send(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createTask = createTask;
function getAllTasks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var infoTasks_1, allTasks, tasks, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    infoTasks_1 = [];
                    allTasks = db.collection('tasks');
                    return [4 /*yield*/, allTasks.get()];
                case 1:
                    tasks = _a.sent();
                    tasks.forEach(function (doc) {
                        infoTasks_1.push(doc.data());
                    });
                    res.send({ message: "Information of the projects", infoTasks: infoTasks_1 });
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
exports.getAllTasks = getAllTasks;
function deleteTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idTask, idProject, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.params, idTask = _a.idTask, idProject = _a.idProject;
                    //Delete the task from the project
                    return [4 /*yield*/, db.collection('projects').doc(idProject).set({
                            tasks: admin.firestore.FieldValue.arrayRemove(idTask)
                        }, { merge: true })];
                case 1:
                    //Delete the task from the project
                    _b.sent();
                    //Delete the task
                    return [4 /*yield*/, db.collection('tasks').doc(idTask)["delete"]()];
                case 2:
                    //Delete the task
                    _b.sent();
                    res.send({ message: "The task was deleted" });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.error(error_3);
                    res.status(500).send(error_3.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTask = deleteTask;
function getATask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idTask, task, foundTask, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    idTask = req.params.idTask;
                    return [4 /*yield*/, db.collection('tasks').doc(idTask).get()];
                case 1:
                    task = _a.sent();
                    foundTask = task.data();
                    res.send({ message: "The task was founded", foundTask: foundTask });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    res.status(500).send(error_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getATask = getATask;
function editTask(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idTask, _a, taskName, description, limitDate, projectId, task, foundTask, project, foundProject, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    idTask = req.params.idTask;
                    _a = req.body, taskName = _a.taskName, description = _a.description, limitDate = _a.limitDate, projectId = _a.projectId;
                    return [4 /*yield*/, db.collection('tasks').doc(idTask).get()];
                case 1:
                    task = _b.sent();
                    foundTask = task.data();
                    return [4 /*yield*/, db.collection('projects').doc(foundTask.projectId).get()];
                case 2:
                    project = _b.sent();
                    foundProject = project.data();
                    if (!(foundProject.projectUuid !== projectId)) return [3 /*break*/, 5];
                    //Delete the task from the old project
                    return [4 /*yield*/, db.collection('projects').doc(foundTask.projectId).set({
                            tasks: admin.firestore.FieldValue.arrayRemove(idTask)
                        }, { merge: true })];
                case 3:
                    //Delete the task from the old project
                    _b.sent();
                    //Add the task to the new project
                    return [4 /*yield*/, db.collection('projects').doc(projectId).set({
                            tasks: admin.firestore.FieldValue.arrayUnion(idTask)
                        }, { merge: true })];
                case 4:
                    //Add the task to the new project
                    _b.sent();
                    _b.label = 5;
                case 5: 
                //Edit the task
                return [4 /*yield*/, db.collection('tasks').doc(idTask).set({
                        taskName: taskName,
                        description: description,
                        limitDate: limitDate,
                        projectId: projectId
                    }, { merge: true })];
                case 6:
                    //Edit the task
                    _b.sent();
                    res.send({ message: "The project was updated" });
                    return [3 /*break*/, 8];
                case 7:
                    error_5 = _b.sent();
                    console.error(error_5);
                    res.status(500).send(error_5.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.editTask = editTask;
