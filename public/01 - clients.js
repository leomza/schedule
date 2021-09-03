//Handle the form to create a new Client:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewClient);

async function handleNewClient(ev) {
    try {
        ev.preventDefault();
        let { clientname, phone, email, dealTime, callLimitPerDay } = ev.target.elements
        clientname = clientname.value;
        phone = phone.value;
        email = email.value;
        dealTime = dealTime.value;
        callLimitPerDay = callLimitPerDay.value;

        modalCreate.style.display = "none";
        ev.target.reset();

        const clientDetails = { clientname, phone, email, dealTime, callLimitPerDay };
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
            <td>${element.dealTime}</td>  
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
                <div id="checkRadioButton" onmouseenter='radioButtonCheck("${foundClient.dealTime}")'>
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
                <label for="retainer2">Retainer:</label>
                <input type="radio" id="retainer2" name="dealTime" value="retainer">
    
                <label for="hourly2">Hourly:</label>
                <input type="radio" id="hourly2" name="dealTime" value="hourly">
    
                <label for="project2">Project:</label>
                <input type="radio" id="project2" name="dealTime" value="project">

                <label for="all2">All:</label>
                <input type="radio" id="all2" name="dealTime" value="all">
    
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
// selected.addEventListener("click", () => {
//     optionsContainer.classList.toggle("active");
//   });


//   optionsList.forEach(o => {
//     o.addEventListener("click", () => {
//       selected.innerHTML = o.querySelector("label").innerHTML;
//       optionsContainer.classList.remove("active");
//     });
//   });
const selectedAll = document.querySelectorAll(".selected");

selectedAll.forEach((selected) => {
    const optionsContainer = selected.previousElementSibling;


    const optionsList = optionsContainer.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        if (optionsContainer.classList.contains("active")) {
            optionsContainer.classList.remove("active");
        } else {
            let currentActive = document.querySelector(".options-container.active");

            if (currentActive) {
                currentActive.classList.remove("active");
            }

            optionsContainer.classList.add("active");
        }


    });

    optionsList.forEach((o) => {
        o.addEventListener("click", () => {
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
            o.children[0].checked = true

        });

    });

    // optionsList.addEventListener('click',()=>{

    // })

    // for (let i = 0; i < optionsList.length; i++) {
    // if(optionsList[i].type === 'radio' ){
    //       i.checked
    // }

    // }



});




//SELECT BOX-TIME
// const selectedTime = document.querySelector(".selected-time");


// selectedTime.addEventListener("click", () => {
//     optionsContainer.classList.toggle("active");
//   });


//   optionsList.forEach(o => {
//     o.addEventListener("click", () => {
//       selected.innerHTML = o.querySelector("label").innerHTML;
//       optionsContainer.classList.remove("active");
//     });
//   });

//In the "form Edit" I stablish the previous checked value that the element already has 
function radioButtonCheck(dealTime) {
    try {
        const elementWithTheEvent = document.querySelector('#checkRadioButton');
        if (!elementWithTheEvent) throw new Error('The is a problem finding the element to check the radio button');

        const radioRetainer = document.querySelector('#retainer2');
        if (!radioRetainer) throw new Error('The is a problem finding the element "retainer" radio button');

        const radioHourly = document.querySelector('#hourly2');
        if (!radioHourly) throw new Error('The is a problem finding the element "hourly" radio button');

        const radioProject = document.querySelector('#project2');
        if (!radioProject) throw new Error('The is a problem finding the element "project" radio button');

        const radioAll = document.querySelector('#all2');
        if (!radioAll) throw new Error('The is a problem finding the element "all" radio button');

        switch (dealTime) {
            case 'retainer':
                radioRetainer.checked = true;
                break;

            case 'hourly':
                radioHourly.checked = true;
                break;

            case 'project':
                radioProject.checked = true;
                break;

            case 'all':
                radioAll.checked = true;
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
        let { clientname, phone, email, dealTime } = ev.target.elements;
        clientname = clientname.value;
        phone = phone.value;
        email = email.value;
        dealTime = dealTime.value;

        if (!clientname || !phone || !email || !dealTime)
            throw new Error("You need to complete all the fields");

        if (!modalEdit) throw new Error('There is a problem finding modalEdit from HTML');
        modalEdit.style.display = "none";
        ev.target.reset();

        const clientDetails = { clientname, phone, email, dealTime };
        const allClients = await axios.put(`/clients/editClient/${clientIdEdit}`, clientDetails);
        renderClients(allClients);
    } catch (error) {
        alert(error)
        swal("Ohhh no!", `${error}`, "warning");
        console.error(error);
    };
};