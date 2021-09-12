"use strict";
exports.__esModule = true;
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(uuid, taskName, description, limitDate, projectId) {
        this.uuid = uuid;
        this.taskName = taskName;
        this.description = description;
        this.limitDate = limitDate;
        this.createdDate = Date.now();
        this.projectId = projectId;
    }
    return Task;
}());
exports.Task = Task;
