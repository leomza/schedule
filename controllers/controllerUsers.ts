export { };

const { v4: uuidv4 } = require("uuid");

//This is to iniitializate Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

const timerUsersDb = db.collection('timerUsers');

//I import the classes (with Methods) of the Models that Im going to use here
import { Users } from "../models/modelUsers";

export function registerUser(req, res) {
    try {
        //Initialice a new instance of Users (the initialization will read the JSON of Users)
        const user = req.user;
        const allUsers = new Users();
        allUsers.createUser(user);

        res.send({ message: "A new User was added", user });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function findUser(req, res) {
    try {
        const allUsers = new Users();
        let userInfo;

        //I use req.email from the cookies 
        if (req.email) {
            userInfo = allUsers.findUser(req.email);
        }

        if (userInfo) {
            res.status(200).send({ message: "Username was found", userInfo });
        } else {
            res.status(400).send("Username was not found");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function login(req, res) {
    try {
        const { email } = req.body;
        //If it is a new cart I create and push the data of the user (email and empty list of products)

        res.send({ message: "Logged in successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function saveTimeUser(req, res) {
    try {
        //Initialice a new instance of Users (the initialization will read the JSON of Users)
        const { idProject, typeOfButton, userEmail, timeInHours } = req.body;
console.log(req.body);
        switch (userEmail) {
            case 'pepe@pepe.com':
                await timerUsersDb.doc('b8d9c5b2-72b3-4510-8d19-8c686fcfd098').set({
                    idProject: idProject,
                    typeOfButton: typeOfButton,
                    userEmail: userEmail,
                    hours: timeInHours[0],
                    minutes: timeInHours[1],
                    seconds: timeInHours[2],
                    id: 'b8d9c5b2-72b3-4510-8d19-8c686fcfd098'
                });
                break;
            case 'juan@juan.com':
                await timerUsersDb.doc('4da0518e-c0da-4a29-933f-9a2cfa680322').set({
                    idProject: idProject,
                    typeOfButton: typeOfButton,
                    userEmail: userEmail,
                    hours: timeInHours[0],
                    minutes: timeInHours[1],
                    seconds: timeInHours[2],
                    id: '4da0518e-c0da-4a29-933f-9a2cfa680322'
                });
                break;
            case 'leo@leo.com':
                await timerUsersDb.doc('5f80580f-f3ea-483b-a0fe-dd13858911ea').set({
                    idProject: idProject,
                    typeOfButton: typeOfButton,
                    userEmail: userEmail,
                    hours: timeInHours[0],
                    minutes: timeInHours[1],
                    seconds: timeInHours[2],
                    id: '5f80580f-f3ea-483b-a0fe-dd13858911ea'
                });
                break;

            default:
                break;
        }
        res.send({ message: "Timer registered" });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function timeInformation(req, res) {
    try {
        const { userEmail } = req.params;
        let id;
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
        const timeInfo = await db.collection('timerUsers').doc(id).get();
        const foundTimer = timeInfo.data();
        res.send({ message: "The timer has information", foundTimer })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function deleteTimeInformation(req, res) {
    try {
        const { userEmail } = req.params;
        let id;
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
        await db.collection('timerUsers').doc(id).delete();
        res.send({ message: "The prevoius information of the clock was deleted" })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

