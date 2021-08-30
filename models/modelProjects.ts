import { Client } from "./modelClients";

export { };
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const projectsJsonPath = path.resolve(__dirname, "./projects.json");

//Function to read the JSON of created projects
const readJsonProjects = () => {
    try {
        const projects = fs.readFileSync(projectsJsonPath);
        return JSON.parse(projects);
    } catch (error) {
        console.error(error);
    }
};

export class Project {
    uuid: string;
    projectName: string;
    client: Client;
    allottedTime: number
    createdDate: any;

    constructor(projectName: string, client: Client, allottedTime: number) {
        this.uuid = uuidv4();
        this.projectName = projectName;
        this.client = new Client(null, null, null, null);
        this.allottedTime = allottedTime;
        this.createdDate = Date.now();
    }
}

export class Projects {
    projects: Array<Project>;

    constructor() {
        this.projects = readJsonProjects();
    }

    updateProjectsJson() {
        try {
            fs.writeFileSync(projectsJsonPath, JSON.stringify(this.projects));
        } catch (error) {
            console.error(error);
        }
    }

    createProject(project) {
        try {
            this.projects.push(project);
            this.updateProjectsJson();
        } catch (error) {
            console.error(error);
        }
    }

    findProjectByUuid(id) {
        try {
            const projectFound = this.projects.find(project => project.uuid === id);
            return projectFound;
        } catch (error) {
            console.error(error);
        }
    }

    deleteProject(id) {
        try {
            this.projects = this.projects.filter(project => project.uuid !== id);
            this.updateProjectsJson();
        } catch (error) {
            console.error(error);
        }
    }
}
