//Handle the form to create a new Client:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewClient);

async function handleNewClient(ev) {
    try {
        ev.preventDefault();
        let { clientname, phone, email, projectType, callLimitPerDay } = ev.target.elements
        clientname = clientname.value;
        phone = phone.value;
        email = email.value;
        projectType = projectType.value;
        callLimitPerDay = callLimitPerDay.value;

        modalCreate.style.display = "none";
        ev.target.reset();

        const clientDetails = { clientname, phone, email, projectType, callLimitPerDay };
        const clientsCreated = await axios.post('/clients/register', clientDetails);
        swal("Good job!", "New user added succesfully!", "success");
        renderClients(clientsCreated.data.allClients.clients);
    } catch (error) {
        console.error(error);
    }
}

//Render all the clients
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
            <td>${element.callLimitPerDay}</td>  
             
            <td class="icons">
<div class="icons__update">
            <img  src="./img/update.svg" alt="" class="table__edit" onclick='editClient("${element.uuid}")' title="Edit"> 
            </div>
            <div class="icons__delete">
          <img src="./img/delete.svg" alt="" class="table__remove" onclick='removeClient("${element.uuid}", "${element.clientname}")' title="Remove"> 
          </div>
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

//Delete a client
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
                    swal("Your client is safe!");
                }
            });
    } catch (error) {
        console.error(error);
    }
}

async function deleteClient(clientId) {
    try {
        const clientsInfo = await axios.delete(`/clients/deleteClient/${clientId}`);
        renderClients(clientsInfo.data.allClients.clients);
    } catch (error) {
        console.error(error);
    }
}

//Update a client:
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
}
//SELECT BOX

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");
const btn = document.querySelector('.button-form')
selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});


optionsList.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});

selected.addEventListener("click", () => {
    btn.classList.toggle("button-hiden");
});

//In the "form Edit" I stablish the previous checked value that the element already has 
function radioButtonCheck(projectType) {
    try {
        const elementWithTheEvent = document.querySelector('#checkRadioButton');
        if (!elementWithTheEvent) throw new Error('The is a problem finding the element to check the radio button');

        const radioBranding = document.querySelector('#branding2');
        if (!radioBranding) throw new Error('The is a problem finding the element "branding" radio button');

        const radioDesign = document.querySelector('#design2');
        if (!radioDesign) throw new Error('The is a problem finding the element "design" radio button');

        const radioBusiness = document.querySelector('#business2');
        if (!radioBusiness) throw new Error('The is a problem finding the element "business" radio button');

        switch (projectType) {
            case 'branding':
                radioBranding.checked = true;
                break;

            case 'design':
                radioDesign.checked = true;
                break;

            case 'business':
                radioBusiness.checked = true;
                break;
        };

        //With this the event is going to happen only once
        elementWithTheEvent.onmouseenter = null;
    } catch (error) {
        console.error(error);
    };
};



//Handle Edit
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
        const allClients = await axios.put(`/clients/editClient/${clientIdEdit}`, clientDetails);
        renderClients(allClients);
    } catch (error) {
        alert(error)
        swal("Ohhh no!", `${error}`, "warning");
        console.error(error);
    };
};