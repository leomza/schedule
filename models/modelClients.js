"use strict";
exports.__esModule = true;
exports.Clients = exports.Client = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var clientsJsonPath = path.resolve(__dirname, "./clients.json");
//Function to read the JSON of created clients
var readJsonClients = function () {
    try {
        var clients = fs.readFileSync(clientsJsonPath);
        return JSON.parse(clients);
    }
    catch (error) {
        console.error(error);
    }
};
var ProjectType;
(function (ProjectType) {
    ProjectType["branding"] = "branding";
    ProjectType["design"] = "design";
    ProjectType["business"] = "business";
})(ProjectType || (ProjectType = {}));
var Client = /** @class */ (function () {
    function Client(clientname, phone, email, projectType, callLimitPerDay) {
        this.uuid = uuidv4();
        this.clientname = clientname;
        this.phone = phone;
        this.email = email;
        this.projectType = projectType;
        this.callLimitPerDay = callLimitPerDay;
        this.createdDate = Date.now();
    }
    return Client;
}());
exports.Client = Client;
var Clients = /** @class */ (function () {
    function Clients() {
        this.clients = readJsonClients();
    }
    Clients.prototype.updateClientsJson = function () {
        try {
            fs.writeFileSync(clientsJsonPath, JSON.stringify(this.clients));
        }
        catch (error) {
            console.error(error);
        }
    };
    Clients.prototype.createClient = function (client) {
        try {
            this.clients.push(client);
            this.updateClientsJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    Clients.prototype.findClientByUuid = function (id) {
        try {
            var clientFound = this.clients.find(function (client) { return client.uuid === id; });
            return clientFound;
        }
        catch (error) {
            console.error(error);
        }
    };
    Clients.prototype.deleteClient = function (id) {
        try {
            this.clients = this.clients.filter(function (client) { return client.uuid !== id; });
            this.updateClientsJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    return Clients;
}());
exports.Clients = Clients;
