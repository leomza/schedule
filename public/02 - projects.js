//Handle the form to create a new Project:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewClient);

async function handleNewClient(ev) {
    try {
        ev.preventDefault();
        let { projectName, clientName, task, status } = ev.target.elements
        projectName = projectName.value;
        clientName = clientName.value;
        task = task.value;
        status = status.value;

        modalCreate.style.display = "none";
        ev.target.reset();

        const ProjectDetails = { projectName, clientName, task, status };
        const projectsCreated = await axios.post('/projects/addNew', ProjectDetails);
        swal("Good job!", "New project added succesfully!", "success");
        //renderProjects(projectsCreated.data.allProjectrs.projects);
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
            option.innerHTML = clients[index].clientname;
            select.appendChild(option);
        }
    } catch (error) {
        console.error(error);
    }
}

/* //Render all the projects
async function renderClients(clientsToShow) {
    try {
        const table = document.querySelector('.table');
        if (!table) throw new Error('There is a problem finding table from HTML');

        if (!clientsToShow) {
            const clientsInfo = await axios.get(`/clients/getAllClients`);
            const { clients } = clientsInfo.data.allClients;
            clientsToShow = clients;
        }

        let html = clientsToShow.map(element => {
            return (
                `<tr>
            <td>${element.clientname}</td>
            <td>${element.phone}</td>
            <td>${element.email}</td>
            <td>${element.projectType}</td>
            <td>
            <i class="fas fa-edit table__edit" onclick='editClient("${element.uuid}")' title="Edit"></i>
            <i class="fas fa-trash table__remove" onclick='removeClient("${element.uuid}", "${element.clientname}")' title="Remove"></i>
            </td>
            </tr>`
            );
        }).join('');

        table.innerHTML = html;

    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
} */

/* //Delete a client
function removeClient(clientId, clientName) {
    try {
        swal({
            title: "Are you sure?",
            text: `Once deleted, you will not be able to recover this client ${clientName}!`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteClient(clientId);
                } else {
                    swal("Your product is safe!");
                }
            });
    } catch (error) {
        console.error(error);
    }
} */

/* async function deleteClient(clientId) {
    try {
        const clientsInfo = await axios.delete(`/clients/deleteClient/${clientId}`);
        renderClients(clientsInfo.data.allClients.clients);
    } catch (error) {
        console.error(error);
    }
} */

/* //Update a client:
//This will contain the Client Id to Edit
let clientIdEdit;

async function editClient(uuidClient) {
    try {
        if (!modalEdit) throw new Error('There is a problem finding the modal in the HTML');
        modalEdit.style.display = "block";
        modalEdit.classList.add("showModal");

        const formEdit = document.querySelector("#formEdit");
        if (!formEdit) throw new Error('There is a problem finding form from HTML');
        const clientFound = await axios.get(`clients/findClient/${uuidClient}`);
        const { foundClient } = clientFound.data;
        let html = `
                <div id="checkRadioButton" onmouseenter='radioButtonCheck("${foundClient.projectType}")'>
                 <h3>Edit client</h3>

                <div class="form__wrapper">
                    <input type="text" name="clientname" value="${foundClient.clientname}" placeholder="Clientname" required>
                </div>


                <div class="form__wrapper">
                    <input type="text" name="phone" value="${foundClient.phone}" placeholder="Phone" required>
                </div>

                <div class="form__wrapper">
                    <input type="email" name="email" value="${foundClient.email}" placeholder="Email" required>
                </div>

                <div>
                <label for="branding2">Branding:</label>
                <input type="radio" id="branding2" name="projectType" value="branding">

                <label for="design2">Design:</label>
                <input type="radio" id="design2" name="projectType" value="design">

                <label for="business2">Business:</label>
                <input type="radio" id="business2" name="projectType" value="business">

                </div>
                <input type="submit" value="Update client">
                </div>`
        formEdit.innerHTML = html;
        clientIdEdit = foundClient.uuid;
    } catch (error) {
        console.error(error);
    }
} */

/* //Handle Edit
async function handleEdit(ev) {
    try {
        console.log(ev.target.elements);
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