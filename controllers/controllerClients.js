"use strict";
exports.__esModule = true;
exports.setClientTime = exports.getAClient = exports.editClient = exports.deleteClient = exports.getAllClients = exports.registerClient = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var modelClients_1 = require("../models/modelClients");
function registerClient(req, res) {
    try {
        var _a = req.body, clientname = _a.clientname, phone = _a.phone, email = _a.email, dealTime = _a.dealTime, callLimitPerDay = _a.callLimitPerDay;
        var newClient = new modelClients_1.Client(clientname, phone, email, dealTime, callLimitPerDay);
        var allClients = new modelClients_1.Clients();
        allClients.createClient(newClient);
        res.send({ message: "A new Client was register", allClients: allClients });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.registerClient = registerClient;
function getAllClients(req, res) {
    try {
        var allClients = new modelClients_1.Clients();
        res.send({ message: "Information of the clients", allClients: allClients });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.getAllClients = getAllClients;
function deleteClient(req, res) {
    try {
        var idClient = req.params.idClient;
        var allClients = new modelClients_1.Clients();
        allClients.deleteClient(idClient);
        res.send({ message: "The client was deleted", allClients: allClients });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.deleteClient = deleteClient;
function editClient(req, res) {
    try {
        var idClient = req.params.idClient;
        var _a = req.body, clientname = _a.clientname, phone = _a.phone, email = _a.email, dealTime = _a.dealTime, callLimitPerDay = _a.callLimitPerDay;
        var allClients = new modelClients_1.Clients();
        var foundClient = allClients.findClientByUuid(idClient);
        foundClient.clientname = clientname;
        foundClient.phone = phone;
        foundClient.email = email;
        foundClient.dealTime = dealTime;
        foundClient.callLimitPerDay = callLimitPerDay;
        allClients.updateClientsJson();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.editClient = editClient;
function getAClient(req, res) {
    try {
        var idClient = req.params.idClient;
        var allClients = new modelClients_1.Clients();
        var foundClient = allClients.findClientByUuid(idClient);
        res.send({ message: "The client was founded", foundClient: foundClient });
    }
    catch (error) {
        console.error(error);
    }
}
exports.getAClient = getAClient;
function setClientTime(req, res) {
    try {
        var _a = req.params, idProject = _a.idProject, typeOfButton = _a.typeOfButton;
        var allClients = new modelClients_1.Clients();
        var client = allClients.findClientByProyectId(idProject);
        if (typeOfButton === 'design') {
            client.lastDesignDate = new Date();
        }
        else if (typeOfButton === 'call') {
            client.lastCallDate = new Date();
        }
        allClients.updateClientsJson();
        res.send({ message: "The client time was updated" });
    }
    catch (error) {
        console.error(error);
    }
}
exports.setClientTime = setClientTime;
