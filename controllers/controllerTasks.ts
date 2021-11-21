export { };

const { v4: uuidv4 } = require("uuid");

//This is to iniitializate Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

const tasksDb = db.collection('tasks');

export async function createTask(req, res) {
    try {
        const { taskName, description, limitDate, projectId, status, flag } = req.body;
        const id = uuidv4()
        await tasksDb.doc(id).set({
            uuid: id,
            taskName: taskName,
            description: description,
            limitDate: limitDate,
            createdDate: Date.now(),
            projectId: projectId,
            status: status,
            flag: flag

        });
        const newTask = await db.collection('tasks').doc(id).get();
        const task = newTask.data();

        res.send({ message: "A new Task was register", task });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getAllTasks(req, res) {
    try {
        let infoTasks = [];
        const allTasks = db.collection('tasks');
        const tasks = await allTasks.get();
        tasks.forEach(doc => {
            infoTasks.push(doc.data())
        });
        res.send({ message: "Information of the projects", infoTasks })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function deleteTask(req, res) {
    try {
        const { idTask, idProject } = req.params;

        //Delete the task from the project
        await db.collection('projects').doc(idProject).set({
            tasks: admin.firestore.FieldValue.arrayRemove(idTask)
        }, { merge: true });

        //Delete the task
        await db.collection('tasks').doc(idTask).delete();

        res.send({ message: "The task was deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getATask(req, res) {
    try {
        const { idTask } = req.params;
        const task = await db.collection('tasks').doc(idTask).get();
        const foundTask = task.data();

        res.send({ message: "The task was founded", foundTask })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function editTask(req, res) {
    try {
        const { idTask } = req.params;
        const { taskName, description, limitDate, projectId, status, flag } = req.body;

        //Found the task
        const task = await db.collection('tasks').doc(idTask).get();
        const foundTask = task.data();

        //If the change move to another proyect should change the taskId
        const project = await db.collection('projects').doc(foundTask.projectId).get();
        const foundProject = project.data();

        if (foundProject.projectUuid !== projectId) {
            //Delete the task from the old project
            await db.collection('projects').doc(foundTask.projectId).set({
                tasks: admin.firestore.FieldValue.arrayRemove(idTask)
            }, { merge: true });

            //Add the task to the new project
            await db.collection('projects').doc(projectId).set({
                tasks: admin.firestore.FieldValue.arrayUnion(idTask)
            }, { merge: true });
        }

        //Edit the task
        await db.collection('tasks').doc(idTask).set({
            taskName: taskName,
            description: description,
            limitDate: limitDate,
            projectId: projectId,
            status: status,
            flag: flag
        }, { merge: true });
        res.send({ message: "The project was updated" })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}