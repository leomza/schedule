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

export function getATask(req, res){
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