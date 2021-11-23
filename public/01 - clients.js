//Handle the form to create a new Client:
const handleFormClient = document.querySelector("#formCreateClient");
handleFormClient.addEventListener("submit", handleNewClient);

async function handleNewClient(ev) {
  try {
    ev.preventDefault();
    let { clientname, phone, email, dealTime, callLimitPerDay } = ev.target.elements;

    clientname = clientname.value;
    phone = phone.value;
    email = email.value;
    dealTime = dealTime.value;
    callLimitPerDay = callLimitPerDay.value;

    //When I create from the client Dashboard
    // modalCreate.style.display = "none";
    // //When I create from the task Dashboard
    // if (modalCreateClient) {
    //   modalCreateClient.style.display = "none";
    // }
    
    ev.target.reset();

    const clientDetails = { clientname, phone, email, dealTime, callLimitPerDay };
    await axios.post('/clients/register', clientDetails);
    swal("Good job!", "New user added succesfully!", "success").then(() => {
      renderClients();
    })
  } catch (error) {
    console.error(error);
  }
}

//Render all the clients
async function renderClients(clientsToShow) {
  try {
    const table = document.querySelector(".table");
    if (!table) throw new Error("There is a problem finding table from HTML");

    if (!clientsToShow) {
      const clientsInfo = await axios.get(`/clients/getAllClients`);
      clientsToShow = clientsInfo.data.infoClients;
    }

    const clientsToShowSorted = clientsToShow.sort((a, b) => a.clientname.localeCompare(b.clientname))

    let html = clientsToShowSorted.map((element) => {
 
      return `<tr>
            <td>${element.clientname}</td>
            <td>${element.phone}</td> 
            <td>${element.email}</td>
            <td>${element.dealTime}</td>  
            <td>${element.callLimitPerDay}</td>  
             
            <td class="icons">
             
            <img  src="./img/update.svg" alt="" class="table__edit" onclick='editClient("${element.id}")' title="Edit"> 
            
          <img src="./img/delete.svg" alt="" class="table__remove" onclick='removeClient("${element.id}", "${element.clientname}")' title="Remove"> 
          
          </td> 
             
            </tr>`;
    })
      .join("");

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
    }).then((willDelete) => {
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
    await axios.delete(`/clients/deleteClient/${clientId}`);
    renderClients();
  } catch (error) {
    console.error(error);
  }
}

//Update a client:
//This will contain the Client Id to Edit
let clientIdEdit;

async function editClient(uuidClient) {
  try {
    if (!modalEdit)
      throw new Error("There is a problem finding the modal in the HTML");
    modalEdit.style.display = "block";
    modalEdit.classList.add("showModal");

    const formEdit = document.querySelector("#formEdit");
    if (!formEdit) throw new Error("There is a problem finding form from HTML");
    const clientFound = await axios.get(`clients/findClient/${uuidClient}`);
    const { foundClient } = clientFound.data;
    let html = `
                <div>
                 <h3>Edit client</h3>

                <div class="form__wrapper">
                    <input type="text" name="clientname" value="${foundClient.clientname}" placeholder="Clientname" required>
                </div>

                <div class="form__wrapper">
                    <input type="text" name="phone" value="${foundClient.phone}" placeholder="Phone">
                </div>

                <div class="form__wrapper">
                    <input type="email" name="email" value="${foundClient.email}" placeholder="Email">
                </div>

                <div class="form__wrapper">
                <select class="form__wrapper--select" name="dealTime" id="dealTime">
                      <option value="${foundClient.dealTime}" selected disabled hidden>${foundClient.dealTime}</option>
                      <option value="retainer">Retainer</option>
                      <option value="hourly">Hourly</option>
                      <option value="project">Project</option>
                      <option value="all">All</option>
                </select>
                </div>

                <div class="form__wrapper">
                <select class="form__wrapper--select" name="callLimitPerDay" id="callLimitPerDay">
                      <option value="${foundClient.callLimitPerDay}" selected disabled hidden>${foundClient.callLimitPerDay} minutes per day</option>
                      <option value="10">10 minutes per day</option>
                      <option value="30">30 minutes per day</option>
                      <option value="withOutLimits">With Out Limits</option>
                </select>
                </div>

              <input type="submit" value="Update client" class="button-form">
              </div>
              `;

    formEdit.innerHTML = html;
    clientIdEdit = foundClient.id;

  } catch (error) {
    console.error(error);
  }
}

//Handle Edit
async function handleEdit(ev) {
  try {
    let { clientname, phone, email, dealTime, callLimitPerDay } = ev.target.elements;
    clientname = clientname.value;
    phone = phone.value;
    email = email.value;
    dealTime = dealTime.value;
    callLimitPerDay = callLimitPerDay.value;

    if (!clientname || !dealTime || !callLimitPerDay)
      throw new Error("You need to complete all the fields");

    if (!modalEdit)
      throw new Error("There is a problem finding modalEdit from HTML");
    modalEdit.style.display = "none";
    ev.target.reset();

    const clientDetails = { clientname, phone, email, dealTime, callLimitPerDay };
    await axios.put(`/clients/editClient/${clientIdEdit}`, clientDetails);
    renderClients();
  } catch (error) {
    swal("Ohhh no!", `${error}`, "warning");
    console.error(error);
  }
}
