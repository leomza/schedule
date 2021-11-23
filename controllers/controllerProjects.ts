export { };

const { v4: uuidv4 } = require("uuid");

//This is to iniitializate Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

const projectsDb = db.collection('projects');

export async function registerProject(req, res) {
    try {
        const { projectName, clientId, projectType, status, totalHours } = req.body;
        const id = uuidv4()
        await projectsDb.doc(id).set({
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
        });

        res.send({ message: "A new Project was register" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getAllProjects(req, res) {
    try {
        let infoProjects = [];
        const allProjects = db.collection('projects');
        const projects = await allProjects.get();
        projects.forEach(doc => {
            infoProjects.push(doc.data())
        });
        res.send({ message: "Information of the projects", infoProjects })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function deleteProject(req, res) {
    try {
        const { idProject } = req.params;
        await db.collection('projects').doc(idProject).delete();
        res.send({ message: "The project was deleted" })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function editProject(req, res) {
    try {
        const { idProject } = req.params;
        const { projectName, clientId, projectType, status, totalHours } = req.body;

        await db.collection('projects').doc(idProject).set({
            projectName: projectName,
            clientId: clientId,
            projectType: projectType,
            status: status,
            totalHours: totalHours,
        }, { merge: true });
        res.send({ message: "The project was updated" })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getAProject(req, res) {
    try {
        const { idProject } = req.params;
        const project = await db.collection('projects').doc(idProject).get();
        const foundProject = project.data();
        res.send({ message: "The project was founded", foundProject })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function addTask(req, res) {
    try {
        const { uuid, idProject } = req.body;
        await db.collection('projects').doc(idProject).set({
            tasks: admin.firestore.FieldValue.arrayUnion(uuid)
        }, { merge: true });

        res.send({ message: "The task was added to the project" })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function setProjectTime(req, res) {
    try {
        let { idProject, timeInHours, typeOfButton } = req.params;

        const project = await db.collection('projects').doc(idProject).get();
        const foundProject = project.data();
        timeInHours = parseFloat(timeInHours);

        await db.collection('projects').doc(idProject).set({
            usedHours: foundProject.usedHours + timeInHours
        }, { merge: true });

        //If the type of button is design also add in that variable
        if (typeOfButton === 'design') {
            await db.collection('projects').doc(idProject).set({
                timeInDesign: foundProject.timeInDesign + timeInHours
            }, { merge: true });
        }
        res.send({ message: "The time was added to the project" })
    } catch (error) {
        console.error(error);
    }
}

export async function resetRetailerInfo(req, res) {
    try {
        let { idProject } = req.params;

        await db.collection('projects').doc(idProject).set({
            usedHours: 0,
            timeInDesign: 0
        }, { merge: true });
    } catch (error) {
        console.error(error);
    }
}