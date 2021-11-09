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
exports.deleteTimeInformation = exports.timeInformation = exports.saveTimeUser = exports.login = exports.findUser = exports.registerUser = void 0;
var uuidv4 = require("uuid").v4;
//This is to iniitializate Firebase
var admin = require('firebase-admin');
var db = admin.firestore();
var timerUsersDb = db.collection('timerUsers');
//I import the classes (with Methods) of the Models that Im going to use here
var modelUsers_1 = require("../models/modelUsers");
function registerUser(req, res) {
    try {
        //Initialice a new instance of Users (the initialization will read the JSON of Users)
        var user = req.user;
        var allUsers = new modelUsers_1.Users();
        allUsers.createUser(user);
        res.send({ message: "A new User was added", user: user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.registerUser = registerUser;
function findUser(req, res) {
    try {
        var allUsers = new modelUsers_1.Users();
        var userInfo = void 0;
        //I use req.email from the cookies 
        if (req.email) {
            userInfo = allUsers.findUser(req.email);
        }
        if (userInfo) {
            res.status(200).send({ message: "Username was found", userInfo: userInfo });
        }
        else {
            res.status(400).send("Username was not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.findUser = findUser;
function login(req, res) {
    try {
        var email = req.body.email;
        //If it is a new cart I create and push the data of the user (email and empty list of products)
        res.send({ message: "Logged in successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
function saveTimeUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idProject, typeOfButton, userEmail, timeInHours, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
                    _a = req.body, idProject = _a.idProject, typeOfButton = _a.typeOfButton, userEmail = _a.userEmail, timeInHours = _a.timeInHours;
                    console.log(req.body);
                    _b = userEmail;
                    switch (_b) {
                        case 'pepe@pepe.com': return [3 /*break*/, 1];
                        case 'juan@juan.com': return [3 /*break*/, 3];
                        case 'leo@leo.com': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, timerUsersDb.doc('b8d9c5b2-72b3-4510-8d19-8c686fcfd098').set({
                        idProject: idProject,
                        typeOfButton: typeOfButton,
                        userEmail: userEmail,
                        hours: timeInHours[0],
                        minutes: timeInHours[1],
                        seconds: timeInHours[2],
                        id: 'b8d9c5b2-72b3-4510-8d19-8c686fcfd098'
                    })];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 3: return [4 /*yield*/, timerUsersDb.doc('4da0518e-c0da-4a29-933f-9a2cfa680322').set({
                        idProject: idProject,
                        typeOfButton: typeOfButton,
                        userEmail: userEmail,
                        hours: timeInHours[0],
                        minutes: timeInHours[1],
                        seconds: timeInHours[2],
                        id: '4da0518e-c0da-4a29-933f-9a2cfa680322'
                    })];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, timerUsersDb.doc('5f80580f-f3ea-483b-a0fe-dd13858911ea').set({
                        idProject: idProject,
                        typeOfButton: typeOfButton,
                        userEmail: userEmail,
                        hours: timeInHours[0],
                        minutes: timeInHours[1],
                        seconds: timeInHours[2],
                        id: '5f80580f-f3ea-483b-a0fe-dd13858911ea'
                    })];
                case 6:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 7: return [3 /*break*/, 8];
                case 8:
                    res.send({ message: "Timer registered" });
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _c.sent();
                    console.error(error_1);
                    res.status(500).send(error_1.message);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.saveTimeUser = saveTimeUser;
function timeInformation(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userEmail, id, timeInfo, foundTimer, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userEmail = req.params.userEmail;
                    id = void 0;
                    switch (userEmail) {
                        case 'pepe@pepe.com':
                            id = 'b8d9c5b2-72b3-4510-8d19-8c686fcfd098';
                            break;
                        case 'juan@juan.com':
                            id = '4da0518e-c0da-4a29-933f-9a2cfa680322';
                            break;
                        case 'leo@leo.com':
                            id = '5f80580f-f3ea-483b-a0fe-dd13858911ea';
                            break;
                        default:
                            break;
                    }
                    return [4 /*yield*/, db.collection('timerUsers').doc(id).get()];
                case 1:
                    timeInfo = _a.sent();
                    foundTimer = timeInfo.data();
                    res.send({ message: "The timer has information", foundTimer: foundTimer });
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
exports.timeInformation = timeInformation;
function deleteTimeInformation(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userEmail, id, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userEmail = req.params.userEmail;
                    id = void 0;
                    switch (userEmail) {
                        case 'pepe@pepe.com':
                            id = 'b8d9c5b2-72b3-4510-8d19-8c686fcfd098';
                            break;
                        case 'juan@juan.com':
                            id = '4da0518e-c0da-4a29-933f-9a2cfa680322';
                            break;
                        case 'leo@leo.com':
                            id = '5f80580f-f3ea-483b-a0fe-dd13858911ea';
                            break;
                        default:
                            break;
                    }
                    //Delete the document with the information
                    return [4 /*yield*/, db.collection('timerUsers').doc(id)["delete"]()];
                case 1:
                    //Delete the document with the information
                    _a.sent();
                    res.send({ message: "The prevoius information of the clock was deleted" });
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
exports.deleteTimeInformation = deleteTimeInformation;
