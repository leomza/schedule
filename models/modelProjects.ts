export { };

import { Task } from '../models/modelTasks';

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
    all = 'all',
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

    constructor(projectUuid: string, projectName: string, clientId: string, projectType: projectType, status: Status, totalHours: number) {
        this.projectUuid = projectUuid;
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