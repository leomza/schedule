export { };

//I import the classes (with Methods) of the Models that Im going to use here
import { Project, Projects } from "../models/modelProjects";


export function registerProject(req, res) {
    try {
        const { projectName, clientId, projectType, status, totalHours } = req.body;
        const newProject = new Project(projectName, clientId, projectType, status, totalHours)
        const allProjects = new Projects();
        allProjects.createProject(newProject);

        res.send({ message: "A new Project was register", allProjects });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function getAllProjects(req, res) {
    try {
        const allProjects = new Projects();
        res.send({ message: "Information of the projects", allProjects })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function deleteProject(req, res) {
    try {
        const { idProject } = req.params;
        const allProjects = new Projects();
        allProjects.deleteProject(idProject);
        res.send({ message: "The project was deleted", allProjects })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function editProject(req, res) {
    try {
        const { idProject } = req.params;
        const { projectName, clientId, projectType, status, totalHours } = req.body;
        const allProjects = new Projects();
        const foundProject = allProjects.findProjectByUuid(idProject)
        foundProject.projectName = projectName;
        foundProject.clientId = clientId;
        foundProject.projectType = projectType;
        foundProject.status = status;
        foundProject.totalHours = totalHours;
        allProjects.updateProjectsJson();
        res.send({ message: "The project was updated", allProjects })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function getAProject(req, res) {
    try {
        const { idProject } = req.params;
        const allProjects = new Projects();
        const foundProject = allProjects.findProjectByUuid(idProject)
        res.send({ message: "The project was founded", foundProject })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function addTask(req, res) {
    try {
        const { uuid, idProject } = req.body;
        const allProjects = new Projects();
        const foundProject = allProjects.findProjectByUuid(idProject);
        foundProject.tasks.push(uuid);
        allProjects.updateProjectsJson();
        res.send({ message: "The task was added to the project", allProjects })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function setProjectTime(req, res) {
    try {
        let { idProject, timeInHours } = req.params;
        const allProjects = new Projects();
        const foundProject = allProjects.findProjectByUuid(idProject);
        timeInHours = parseFloat(timeInHours);
        foundProject.usedHours = foundProject.usedHours + timeInHours;
        allProjects.updateProjectsJson();
        res.send({ message: "The time was added to the project" })
    } catch (error) {
        console.error(error);
    }
}