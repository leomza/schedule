export { };
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const clientsJsonPath = path.resolve(__dirname, "./clients.json");

//Function to read the JSON of created clients
const readJsonClients = () => {
    try {
        const clients = fs.readFileSync(clientsJsonPath);
        return JSON.parse(clients);
    } catch (error) {
        console.error(error);
    }
};

enum DealTime {
    retainer = 'retainer',
    hourly = 'hourly',
    project = 'project',
    all = 'all'
}

export class Client {
    uuid: string;
    clientname: string;
    phone: string;
    email: string;
    dealTime: DealTime;
    callLimitPerDay: string;
    createdDate: any;


    constructor(clientname: string, phone: string, email: string, dealTime: DealTime, callLimitPerDay: string) {
        this.uuid = uuidv4();
        this.clientname = clientname;
        this.phone = phone;
        this.email = email;
        this.dealTime = dealTime;
        this.callLimitPerDay = callLimitPerDay;
        this.createdDate = Date.now();
    }
}

export class Clients {
    clients: Array<Client>;

    constructor() {
        this.clients = readJsonClients();
    }

    updateClientsJson() {
        try {
            fs.writeFileSync(clientsJsonPath, JSON.stringify(this.clients));
        } catch (error) {
            console.error(error);
        }
    }

    createClient(client) {
        try {
            this.clients.push(client);
            this.updateClientsJson();
        } catch (error) {
            console.error(error);
        }
    }

    findClientByUuid(id) {
        try {
            const clientFound = this.clients.find(client => client.uuid === id);
            return clientFound;
        } catch (error) {
            console.error(error);
        }
    }

    deleteClient(id) {
        try {
            this.clients = this.clients.filter(client => client.uuid !== id);
            this.updateClientsJson();
        } catch (error) {
            console.error(error);
        }
    }
}
