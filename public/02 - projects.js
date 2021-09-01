//Handle the form to create a new Project:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewClient);

async function handleNewClient(ev) {
    try {
        ev.preventDefault();
        let { projectName, clientId, task, status, totalHours } = ev.target.elements
        projectName = projectName.value;
        clientId = selectClientName.value;
        task = task.value;
        status = status.value;
        totalHours = totalHours.valueAsNumber;

        modalCreate.style.display = "none";
        ev.target.reset();

        const projectDetails = { projectName, clientId, task, status, totalHours };
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
                <td>${element.task}</td>
                <td>${element.callLimitPerDay}</td>
                <td>${element.totalHours} / ${element.usedHours}</td>
                <td>${element.status}</td>
                <td>
                <i class="fas fa-edit table__edit" onclick='editProject("${element.projectUuid}")' title="Edit"></i>
                <i class="fas fa-trash table__remove" onclick='removeProject("${element.projectUuid}", "${element.projectName}")' title="Remove"></i>
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

        let html = `
        <div id="checkRadioButtonEdit" onmouseenter='radioButtonCheck("${foundProject.task}", "${foundProject.status}")'>
        <div>
        <label for="projectName">Project Name:</label>
        <input type="text" name="projectName" value="${foundProject.projectName}" placeholder="Project name" required>
        </div>

        <div>
        <label for="selectClientName">Select a client name</label>
        <select onclick="uploadClientNamesEdit()" name="selectClientName" id="selectClientNameEdit">
            <option>Select a client name...</option>
        </select>
        </div>

        <div>
        <label for="task">Task =></label>
        <div>
            <label for="userInterfaz">User Interfaz:</label>
            <input type="radio" id="userInterfazEdit" name="task" value="userInterfaz">

            <label for="graphics">Graphics:</label>
            <input type="radio" id="graphicsEdit" name="task" value="graphics">

            <label for="design">Design:</label>
            <input type="radio" id="designEdit" name="task" value="design">
        </div>
        </div>

        <div>
        <label for="status">Status =></label>
        <div>
            <label for="complete">Complete:</label>
            <input type="radio" id="completeEdit" name="status" value="complete">

            <label for="paidOut">Paid Out:</label>
            <input type="radio" id="paidOutEdit" name="status" value="paidOut">

            <label for="waitingForPayment">Waiting For Payment:</label>
            <input type="radio" id="waitingForPaymentEdit" name="status" value="waitingForPayment">

            <label for="approvedOffer">Approved Offer:</label>
            <input type="radio" id="approvedOfferEdit" name="status" value="approvedOffer">

            <label for="bidding">Bidding:</label>
            <input type="radio" id="biddingEdit" name="status" value="bidding">
        </div>
        </div>
        <div>
            <label for="totalHours">Total hours for the project</label>
            <input type="number" name="totalHours" value="${foundProject.totalHours}" placeholder="Total Hours for the project">
        </div>
                <input type="submit" value="Update project">
                </div>`
        formEdit.innerHTML = html;
        projectIdEdit = foundProject.projectUuid;
    } catch (error) {
        console.error(error);
    }
}

//In the "form Edit" I stablish the previous checked value that the element already has 
function radioButtonCheck(projectType, status) {
    try {
        const elementWithTheEvent = document.querySelector('#checkRadioButtonEdit');
        if (!elementWithTheEvent) throw new Error('The is a problem finding the element to check the radio button');

        //For tasks
        const radioUserInterfaz = document.querySelector('#userInterfazEdit');
        if (!radioUserInterfaz) throw new Error('The is a problem finding the element "user interfaz" radio button');

        const radioGraphics = document.querySelector('#graphicsEdit');
        if (!radioGraphics) throw new Error('The is a problem finding the element "graphics" radio button');

        const radioDesign = document.querySelector('#designEdit');
        if (!radioDesign) throw new Error('The is a problem finding the element "design" radio button');

        switch (projectType) {
            case 'userInterfaz':
                radioUserInterfaz.checked = true;
                break;

            case 'graphics':
                radioGraphics.checked = true;
                break;

            case 'design':
                radioDesign.checked = true;
                break;
        };

        //Status
        const radioComplete = document.querySelector('#completeEdit');
        if (!radioComplete) throw new Error('The is a problem finding the element "complete status" radio button');

        const radioPaidOutEdit = document.querySelector('#paidOutEdit');
        if (!radioPaidOutEdit) throw new Error('The is a problem finding the element "paid out status" radio button');

        const radioWaitingForPaymentEdit = document.querySelector('#waitingForPaymentEdit');
        if (!radioWaitingForPaymentEdit) throw new Error('The is a problem finding the element "waiting for payment" radio button');

        const radioApprovedOfferEdit = document.querySelector('#approvedOfferEdit');
        if (!radioApprovedOfferEdit) throw new Error('The is a problem finding the element "approved Offer status" radio button');

        const radioBiddingEdit = document.querySelector('#biddingEdit');
        if (!radioBiddingEdit) throw new Error('The is a problem finding the element "Bidding status" radio button');

        switch (status) {
            case 'complete':
                radioComplete.checked = true;
                break;

            case 'paidOut':
                radioPaidOutEdit.checked = true;
                break;

            case 'waitingForPayment':
                radioWaitingForPaymentEdit.checked = true;
                break;

            case 'approvedOffer':
                radioApprovedOfferEdit.checked = true;
                break;

            case 'bidding':
                radioBiddingEdit.checked = true;
                break;
        };
        
        //With this the event is going to happen only once
        elementWithTheEvent.onmouseenter = null;
    } catch (error) {
        console.error(error);
    };
};

/* //Handle Edit
async function handleEdit(ev) {
    try {
        let { clientname, phone, email, projectType } = ev.target.elements;
        clientname = clientname.value;
        phone = phone.value;
        email = email.value;
        projectType = projectType.value;
 
        if (!clientname || !phone || !email || !projectType)
            throw new Error("You need to complete all the fields");
 
        if (!modalEdit) throw new Error('There is a problem finding modalEdit from HTML');
        modalEdit.style.display = "none";
        ev.target.reset();
 
        const clientDetails = { clientname, phone, email, projectType };
        console.log(clientDetails);
        const allClients = await axios.put(`/clients/editClient/${clientIdEdit}`, clientDetails);
        renderClients(allClients);
    } catch (error) {
        alert(error)
        swal("Ohhh no!", `${error}`, "warning");
        console.error(error);
    };
}; */

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