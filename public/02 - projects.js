//Handle the form to create a new Project:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewProject);

async function handleNewProject(ev) {
    try {
        ev.preventDefault();
        let { projectName, clientId, projectType, status, totalHours } = ev.target.elements
        projectName = projectName.value;
        clientId = selectClientName.value;
        projectType = projectType.value;
        status = status.value;
        totalHours = totalHours.valueAsNumber;

        modalCreate.style.display = "none";
        ev.target.reset();

        const projectDetails = { projectName, clientId, projectType, status, totalHours };
        const projectsCreated = await axios.post('/projects/addNew', projectDetails);
        swal("Good job!", "New project added succesfully!", "success");
        renderProjects(projectsCreated.data.allProjects.projects);
    } catch (error) {
        console.error(error);
    }
}

//Function to get the names of the client in the "select Client Name"
async function uploadClientNames() {
    try {
        const clientsInfo = await axios.get(`/clients/getAllClients`);
        const { clients } = clientsInfo.data.allClients;
        const select = document.getElementById('selectClientName');

        for (let index = 0; index < clients.length; index++) {
            const option = document.createElement('option');
            option.value = clients[index].uuid;
            option.innerHTML = clients[index].clientname;
            select.appendChild(option);
        }
    } catch (error) {
        console.error(error);
    }
}

//Render all the projects
async function renderProjects(projectsToShow) {
    try {
        const table = document.querySelector('.table');
        if (!table) throw new Error('There is a problem finding table from HTML');

        const clientsInfo = await axios.get(`/clients/getAllClients`);
        const { clients } = clientsInfo.data.allClients;

        if (!projectsToShow) {
            const projectsInfo = await axios.get(`/projects/getAllprojects`);
            const { projects } = projectsInfo.data.allProjects;
            projectsToShow = projects;
        }

        //Add the information of the user to the project
        for (let index = 0; index < projectsToShow.length; index++) {
            const project = projectsToShow[index];

            clients.forEach(client => {
                if (client.uuid === project.clientId) {
                    Object.assign(projectsToShow[index], client);
                }
            });
        };

        let html = projectsToShow.map(element => {
            return (
                `<tr>
                <td>${element.projectName}</td>
                <td>${element.clientname}</td>
                <td>${element.projectType}</td>
                <td>${element.callLimitPerDay}</td>
                <td>${element.totalHours} / ${element.usedHours}</td>
                <td>${element.status}</td>
                <td>
                <img src="./img/edit.png" alt="" onclick='editProject("${element.projectUuid}")' title="Edit"> 
                <img src="./img/delete.png" alt="" onclick='removeProject("${element.projectUuid}", "${element.projectName}")' title="Remove">
                </td>
            </tr>`
            );
        }).join('');
   
        table.innerHTML = html;

    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
}

//Delete a project
function removeProject(projectId, projectName) {
    try {
        swal({
            title: "Are you sure?",
            text: `Once deleted, you will not be able to recover this project ${projectName}!`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteProject(projectId);
                } else {
                    swal("Your project is safe!");
                }
            });
    } catch (error) {
        console.error(error);
    }
}

async function deleteProject(projectId) {
    try {
        const projectsInfo = await axios.delete(`/projects/deleteProject/${projectId}`);
        renderProjects(projectsInfo.data.allProjects.projects);
    } catch (error) {
        console.error(error);
    }
}

//Update a project:
//This will contain the Project Id to Edit
let projectIdEdit;

async function editProject(uuidProject) {
    try {
        if (!modalEdit) throw new Error('There is a problem finding the modal in the HTML');
        modalEdit.style.display = "block";
        modalEdit.classList.add("showModal");

        const formEdit = document.querySelector("#formEdit");
        if (!formEdit) throw new Error('There is a problem finding form from HTML');
        const projectFound = await axios.get(`projects/findProject/${uuidProject}`);
        const { foundProject } = projectFound.data;

        //Set the client Name
        showClientNameInDOM(foundProject.clientId).then((data) => {
            let html = `
        <div>
        <label for="projectName">Project Name:</label>
        <input type="text" name="projectName" value="${foundProject.projectName}" placeholder="Project name" required>
        </div>

        <div>
        <label for="selectClientName">Select a client name</label>
        <select onclick="uploadClientNamesEdit()" name="selectClientName" id="selectClientNameEdit">
        <option id="option${foundProject.clientId}" value="${foundProject.clientId}" selected disabled hidden>${data}</option>    
        </select>
        </div>

        <div>
        <label for="projectType">Project Type:</label>
        <select name="projectType" id="projectType">
            <option value="${foundProject.projectType}" selected disabled hidden>${foundProject.projectType}</option>
            <option value="logo">Logo</option>
            <option value="graphicLanguage">Graphic Language</option>
            <option value="corporateWebsite">Corporate Website</option>
            <option value="landingPage">Landing Page</option>
            <option value="ecommerce">Ecommerce</option>
            <option value="branding">Branding</option>
            <option value="post">Post</option>
            <option value="packageDesign">Package Design</option>
            <option value="banner">Banner</option>
            <option value="rollUp">Roll Up</option>
            <option value="flyer">Flyer</option>
            <option value="digitalBook">Digital Book</option>
            <option value="newsLetter">News Letter</option>
            <option value="calendar">Calendar</option>
            <option value="businessCard">Business Card</option>
            <option value="presentation">Presentation</option>
            <option value="designedPage">Designed Page</option>
        </select>
        </div>

        <div>
        <label for="status">Status:</label>
        <select name="status" id="status">
            <option value="${foundProject.status}" selected disabled hidden>${foundProject.status}</option>
            <option value="offerPending">Offer Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="offerApproved">Offer Approved</option>
            <option value="stuck">Stuck</option>
            <option value="paidUp">Paid Up</option>
            <option value="waitingForSketchApproval">Waiting for Sketch Approval</option>
            <option value="postponed">Postponed</option>
            <option value="canceled">Canceled</option>
            <option value="finished">Finished</option>
        </select>
        </div>

        <div>
            <label for="totalHours">Total hours for the project</label>
            <input type="number" name="totalHours" value="${foundProject.totalHours}" placeholder="Total Hours for the project">
        </div>
                <input type="submit" value="Update project">
        `
            formEdit.innerHTML = html;
            projectIdEdit = foundProject.projectUuid;
        });
    } catch (error) {
        console.error(error);
    }
}

//Function to show the client name in the Edit DOM
async function showClientNameInDOM(clientId) {
    const clientFound = await axios.get(`clients/findClient/${clientId}`);
    return clientFound.data.foundClient.clientname;
}

//Handle Edit
async function handleEdit(ev) {
    try {
        let { projectName, clientId, projectType, status, totalHours } = ev.target.elements
        projectName = projectName.value;
        clientId = selectClientNameEdit.value;
        projectType = projectType.value;
        status = status.value;
        totalHours = totalHours.valueAsNumber;

        if (!projectName || !clientId || !projectType || !status || !totalHours)
            throw new Error("You need to complete all the fields");

        if (!modalEdit) throw new Error('There is a problem finding modalEdit from HTML');
        modalEdit.style.display = "none";
        ev.target.reset();

        const projectDetails = { projectName, clientId, projectType, status, totalHours };
        const allProjects = await axios.put(`/projects/editProject/${projectIdEdit}`, projectDetails);
        renderClients(allProjects);
    } catch (error) {
        swal("Ohhh no!", `${error}`, "warning");
        console.error(error);
    };
};

//Function to get the names of the client in the "select Client Name"
async function uploadClientNamesEdit() {
    try {
        const clientsInfo = await axios.get(`/clients/getAllClients`);
        const { clients } = clientsInfo.data.allClients;
        const select = document.getElementById('selectClientNameEdit');

        for (let index = 0; index < clients.length; index++) {
            const option = document.createElement('option');
            option.value = clients[index].uuid;
            option.innerHTML = clients[index].clientname;
            select.appendChild(option);
        }
        //The event is going to happen just once
        select.onclick = null;
    } catch (error) {
        console.error(error);
    }
}