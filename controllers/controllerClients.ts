export { };

const { v4: uuidv4 } = require("uuid");

//This is to iniitializate Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

const clientsDb = db.collection('clients');

export async function registerClient(req, res) {
    try {
        const { clientname, phone, email, dealTime, callLimitPerDay } = req.body;
        const id = uuidv4()
        await clientsDb.doc(id).set({
            clientname: clientname,
            phone: phone,
            email: email,
            dealTime: dealTime,
            callLimitPerDay: callLimitPerDay,
            createdDate: Date.now(),
            lastDesignDate: '',
            lastCallDate: '',
            id: id
        });

        res.send({ message: "A new Client was register" });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getAllClients(req, res) {
    try {
        let infoClients = [];
        const allClients = db.collection('clients');
        const clients = await allClients.get();
        clients.forEach(doc => {
            infoClients.push(doc.data())
        });
        res.send({ message: "Information of the clients", infoClients })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function deleteClient(req, res) {
    try {
        const { idClient } = req.params;
        await db.collection('clients').doc(idClient).delete();
        res.send({ message: "The client was deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function editClient(req, res) {
    try {
        const { idClient } = req.params;
        const { clientname, phone, email, dealTime, callLimitPerDay } = req.body;

        await db.collection('clients').doc(idClient).set({
            clientname: clientname,
            phone: phone,
            email: email,
            dealTime: dealTime,
            callLimitPerDay: callLimitPerDay,
        }, { merge: true });

        res.send({ message: "The client was updated" })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getAClient(req, res) {
    try {
        const { idClient } = req.params;
        const client = await db.collection('clients').doc(idClient).get();
        const foundClient = client.data();
        res.send({ message: "The client was founded", foundClient })
    } catch (error) {
        console.error(error);
    }
}

export async function setClientTime(req, res) {
    try {
        const { idProject, typeOfButton } = req.params;

        //First search the project
        const project = await db.collection('projects').doc(idProject).get();
        const foundProject = project.data();

        //Search the client through the clientId of the Project
        if (typeOfButton === 'design') {
            await db.collection('clients').doc(foundProject.clientId).set({
                lastDesignDate: new Date()
            }, { merge: true });
        } else if (typeOfButton === 'call') {
            await db.collection('clients').doc(foundProject.clientId).set({
                lastCallDate: new Date()
            }, { merge: true });
        }
        res.send({ message: "The client time was updated" })
    } catch (error) {
        console.error(error);
    }
}