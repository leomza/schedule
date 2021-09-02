export { };

//I import the classes (with Methods) of the Models that Im going to use here
import { Task, Tasks } from "../models/modelTasks";

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