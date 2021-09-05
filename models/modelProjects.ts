export { };

import { Task } from "./modelTasks";
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

enum Status {
    offerPending = 'offerPending',
    inProgress = 'inProgress',
    offerApproved = 'offerApproved',
    stuck = 'stuck',
    paidUp = 'paidUp',
    waitingForSketchApproval = 'waitingForSketchApproval',
    postponed = 'postponed',
    canceled = 'canceled',
    finished = 'finished',
}

enum projectType {
    logo = 'logo',
    graphicLanguage = 'graphicLanguage',
    corporateWebsite = 'corporateWebsite',
    landingPage = 'landingPage',
    ecommerce = 'ecommerce',
    branding = 'branding',
    post = 'post',
    packageDesign = 'packageDesign',
    banner = 'banner',
    rollUp = 'rollUp',
    flyer = 'flyer',
    digitalBook = 'digitalBook',
    newsLetter = 'newsLetter',
    calendar = 'calendar',
    businessCard = 'businessCard',
    presentation = 'presentation',
    designedPage = 'designedPage',
}

export class Project {
    projectUuid: string;
    projectName: string;
    clientId: string;
    projectType: projectType;
    status: Status;
    createdDate: any;
    totalHours: number;
    usedHours: number;
    timeInDesign: number;
    tasks: Array<Task>

    constructor(projectName: string, clientId: string, projectType: projectType, status: Status, totalHours: number) {
        this.projectUuid = uuidv4();
        this.projectName = projectName;
        this.clientId = clientId;
        this.projectType = projectType;
        this.status = status;
        this.createdDate = Date.now();
        this.totalHours = totalHours;
        this.usedHours = 0;
        this.timeInDesign = 0;
        this.tasks = [];
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
            const projectFound = this.projects.find(project => project.projectUuid === id);
            return projectFound;
        } catch (error) {
            console.error(error);
        }
    }

    deleteProject(id) {
        try {
            this.projects = this.projects.filter(project => project.projectUuid !== id);
            this.updateProjectsJson();
        } catch (error) {
            console.error(error);
        }
    }
}
