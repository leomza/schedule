export { };

//I import the classes (with Methods) of the Models that Im going to use here
import { Task, Tasks } from "../models/modelTasks";
import { Projects } from "../models/modelProjects";

export function createTask(req, res) {
    try {
        const { taskName, description, limitDate, projectId } = req.body;
        const newTask = new Task(taskName, description, limitDate, projectId)
        const allTasks = new Tasks();
        allTasks.createTask(newTask);

        res.send({ message: "A new Task was register", newTask, allTasks });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function getAllTasks(req, res) {
    try {
        const allTasks = new Tasks();
        res.send({ message: "Information of the tasks", allTasks })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function deleteTask(req, res) {
    try {
        const { idTask, idProject } = req.params;
        //Delete the task from the project
        const allProjects = new Projects();
        const foundProject = allProjects.findProjectByUuid(idProject);
        foundProject.tasks = foundProject.tasks.filter(task => task = idTask);
        allProjects.updateProjectsJson();

        //Delete the task
        const allTasks = new Tasks();
        allTasks.deleteTask(idTask);

        res.send({ message: "The task was deleted", allTasks })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function getATask(req, res) {
    try {
        const { idTask } = req.params;
        const allTasks = new Tasks();
        const foundTask = allTasks.findTaskById(idTask)
        res.send({ message: "The task was founded", foundTask })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function editTask(req, res) {
    try {
        const { idTask } = req.params;
        const { taskName, description, limitDate, projectId } = req.body;

        //Found the task
        const allTasks = new Tasks();
        const foundTask = allTasks.findTaskById(idTask);

        //If the change move to another proyect should change the taskId
        const allProjects = new Projects();
        const foundProject = allProjects.findProjectByUuid(foundTask.projectId);
        if (foundProject.projectUuid !== projectId) {
            //Delete the task from the old project

            foundProject.tasks = foundProject.tasks.filter(task => task !== idTask);
            //Add the task to the new project
            const newFoundProject = allProjects.findProjectByUuid(projectId);
            newFoundProject.tasks.push(idTask);
            allProjects.updateProjectsJson();
        }

        //Edit the task
        foundTask.taskName = taskName;
        foundTask.description = description;
        foundTask.limitDate = limitDate;
        foundTask.projectId = projectId;

        allTasks.updateTasksJson();
        res.send({ message: "The task was updated", allTasks })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}