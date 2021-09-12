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
exports.setClientTime = exports.getAClient = exports.editClient = exports.deleteClient = exports.getAllClients = exports.registerClient = void 0;
var uuidv4 = require("uuid").v4;
//This is to iniitializate Firebase
var admin = require('firebase-admin');
var db = admin.firestore();
var clientsDb = db.collection('clients');
function registerClient(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, clientname, phone, email, dealTime, callLimitPerDay, id, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, clientname = _a.clientname, phone = _a.phone, email = _a.email, dealTime = _a.dealTime, callLimitPerDay = _a.callLimitPerDay;
                    id = uuidv4();
                    return [4 /*yield*/, clientsDb.doc(id).set({
                            clientname: clientname,
                            phone: phone,
                            email: email,
                            dealTime: dealTime,
                            callLimitPerDay: callLimitPerDay,
                            createdDate: Date.now(),
                            lastDesignDate: '',
                            lastCallDate: '',
                            id: id
                        })];
                case 1:
                    _b.sent();
                    res.send({ message: "A new Client was register" });
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
exports.registerClient = registerClient;
function getAllClients(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var infoClients_1, allClients, clients, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    infoClients_1 = [];
                    allClients = db.collection('clients');
                    return [4 /*yield*/, allClients.get()];
                case 1:
                    clients = _a.sent();
                    clients.forEach(function (doc) {
                        infoClients_1.push(doc.data());
                    });
                    res.send({ message: "Information of the clients", infoClients: infoClients_1 });
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
exports.getAllClients = getAllClients;
function deleteClient(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idClient, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    idClient = req.params.idClient;
                    return [4 /*yield*/, db.collection('clients').doc(idClient)["delete"]()];
                case 1:
                    _a.sent();
                    res.send({ message: "The client was deleted" });
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
exports.deleteClient = deleteClient;
function editClient(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idClient, _a, clientname, phone, email, dealTime, callLimitPerDay, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    idClient = req.params.idClient;
                    _a = req.body, clientname = _a.clientname, phone = _a.phone, email = _a.email, dealTime = _a.dealTime, callLimitPerDay = _a.callLimitPerDay;
                    return [4 /*yield*/, db.collection('clients').doc(idClient).set({
                            clientname: clientname,
                            phone: phone,
                            email: email,
                            dealTime: dealTime,
                            callLimitPerDay: callLimitPerDay
                        }, { merge: true })];
                case 1:
                    _b.sent();
                    res.send({ message: "The client was updated" });
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
exports.editClient = editClient;
function getAClient(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var idClient, client, foundClient, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    idClient = req.params.idClient;
                    return [4 /*yield*/, db.collection('clients').doc(idClient).get()];
                case 1:
                    client = _a.sent();
                    foundClient = client.data();
                    res.send({ message: "The client was founded", foundClient: foundClient });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAClient = getAClient;
function setClientTime(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, idProject, typeOfButton, project, foundProject, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = req.params, idProject = _a.idProject, typeOfButton = _a.typeOfButton;
                    return [4 /*yield*/, db.collection('projects').doc(idProject).get()];
                case 1:
                    project = _b.sent();
                    foundProject = project.data();
                    if (!(typeOfButton === 'design')) return [3 /*break*/, 3];
                    return [4 /*yield*/, db.collection('clients').doc(foundProject.clientId).set({
                            lastDesignDate: new Date()
                        }, { merge: true })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!(typeOfButton === 'call')) return [3 /*break*/, 5];
                    return [4 /*yield*/, db.collection('clients').doc(foundProject.clientId).set({
                            lastCallDate: new Date()
                        }, { merge: true })];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    res.send({ message: "The client time was updated" });
                    return [3 /*break*/, 7];
                case 6:
                    error_6 = _b.sent();
                    console.error(error_6);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.setClientTime = setClientTime;
