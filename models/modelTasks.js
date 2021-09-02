"use strict";
exports.__esModule = true;
exports.Tasks = exports.Task = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var tasksJsonPath = path.resolve(__dirname, "./tasks.json");
//Function to read the JSON of created projects
var readJsonTasks = function () {
    try {
        var tasks = fs.readFileSync(tasksJsonPath);
        return JSON.parse(tasks);
    }
    catch (error) {
        console.error(error);
    }
};
var Task = /** @class */ (function () {
    function Task(taskName, description, limitDate, projectId) {
        this.uuid = uuidv4();
        this.taskName = taskName;
        this.description = description;
        this.limitDate = limitDate;
        this.createdDate = Date.now();
        this.projectId = projectId;
    }
    return Task;
}());
exports.Task = Task;
var Tasks = /** @class */ (function () {
    function Tasks() {
        this.tasks = readJsonTasks();
    }
    Tasks.prototype.updateTasksJson = function () {
        try {
            fs.writeFileSync(tasksJsonPath, JSON.stringify(this.tasks));
        }
        catch (error) {
            console.error(error);
        }
    };
    Tasks.prototype.createTask = function (task) {
        try {
            this.tasks.push(task);
            this.updateTasksJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    return Tasks;
}());
exports.Tasks = Tasks;
