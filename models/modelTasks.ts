export { };

export class Task {
    uuid: string;
    taskName: string;
    description: string;
    limitDate: any;
    createdDate: any;
    projectId: string;

    constructor(uuid:string, taskName: string, description: string, limitDate: any, projectId: string) {
        this.uuid =uuid;
        this.taskName = taskName;
        this.description = description;
        this.limitDate = limitDate;
        this.createdDate = Date.now();
        this.projectId = projectId;
    }
}