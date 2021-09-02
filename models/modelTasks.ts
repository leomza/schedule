export { };
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const tasksJsonPath = path.resolve(__dirname, "./tasks.json");

//Function to read the JSON of created projects
const readJsonTasks = () => {
    try {
        const tasks = fs.readFileSync(tasksJsonPath);
        return JSON.parse(tasks);
    } catch (error) {
        console.error(error);
    }
};

export class Task {
    uuid: string;
    taskName: string;
    description: string;
    limitDate: any;
    createdDate: any;
    projectId: string;

    constructor(taskName: string, description: string, limitDate: any, projectId: string) {
        this.uuid = uuidv4();
        this.taskName = taskName;
        this.description = description;
        this.limitDate = limitDate;
        this.createdDate = Date.now();
        this.projectId = projectId;
    }
}

export class Tasks {
    tasks: Array<Task>;

    constructor() {
        this.tasks = readJsonTasks();
    }

    updateTasksJson() {
        try {
            fs.writeFileSync(tasksJsonPath, JSON.stringify(this.tasks));
        } catch (error) {
            console.error(error);
        }
    }

    createTask(task) {
        try {
            this.tasks.push(task);
            this.updateTasksJson();
        } catch (error) {
            console.error(error);
        }
    }
}