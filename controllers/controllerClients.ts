    export { };

//I import the classes (with Methods) of the Models that Im going to use here
import { Client, Clients } from "../models/modelClients";


export function registerClient(req, res) {
    try {
        const { clientname, phone, email, dealTime, callLimitPerDay } = req.body;
        const newClient = new Client(clientname, phone, email, dealTime, callLimitPerDay)
        const allClients = new Clients();
        allClients.createClient(newClient);

        res.send({ message: "A new Client was register", allClients });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function getAllClients(req, res) {
    try {
        const allClients = new Clients();
        res.send({ message: "Information of the clients", allClients })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function deleteClient(req, res) {
    try {
        const { idClient } = req.params;
        const allClients = new Clients();
        allClients.deleteClient(idClient);
        res.send({ message: "The client was deleted", allClients })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function editClient(req, res) {
    try {
        const { idClient } = req.params;
        const { clientname, phone, email, dealTime, callLimitPerDay } = req.body;
        const allClients = new Clients();
        const foundClient = allClients.findClientByUuid(idClient)
        foundClient.clientname = clientname;
        foundClient.phone = phone;
        foundClient.email = email;
        foundClient.dealTime = dealTime;
        foundClient.callLimitPerDay = callLimitPerDay;
        allClients.updateClientsJson();
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function getAClient(req, res) {
    try {
        const { idClient } = req.params;
        const allClients = new Clients();
        const foundClient = allClients.findClientByUuid(idClient)
        res.send({ message: "The client was founded", foundClient })
    } catch (error) {
        console.error(error);
    }
}