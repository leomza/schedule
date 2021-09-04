/* //Handle the form to create a new Client:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener("submit", handleNewClient);

async function handleNewClient(ev) {
  try {
    ev.preventDefault();
    let { clientname, phone, email, dealTime, callLimitPerDay } =
      ev.target.elements;
    clientname = clientname.value;
    phone = phone.value;
    email = email.value;
    dealTime = dealTime.value;
    callLimitPerDay = callLimitPerDay.value;

    modalCreate.style.display = "none";
    ev.target.reset();

    const clientDetails = {
      clientname,
      phone,
      email,
      dealTime,
      callLimitPerDay,
    };
    const clientsCreated = await axios.post("/clients/register", clientDetails);
    swal("Good job!", "New user added succesfully!", "success");
    renderClients(clientsCreated.data.allClients.clients);
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
      const { clients } = clientsInfo.data.allClients;
      clientsToShow = clients;
    }

    let html = clientsToShow
      .map((element) => {
        return `<tr>
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
             
            </tr>`;
      })
      .join("");

    table.innerHTML = html;
  } catch (error) {
    swal("Ohhh no!", error.response.data, "warning");
    console.error(error);
  }
}
//SELECT BOX

// const optionsContainer = document.querySelector(".options-container");
// const optionsList = document.querySelectorAll(".option");
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
      o.children[0].checked = true;
    });
  });
});

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
    if (!modalEdit)
      throw new Error("There is a problem finding the modal in the HTML");
    modalEdit.style.display = "block";
    modalEdit.classList.add("showModal");

    const formEdit = document.querySelector("#formEdit");
    console.log(formEdit);
    if (!formEdit) throw new Error("There is a problem finding form from HTML");
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

                <div class="select-box-edit">
                <div class="options-container-edit">
                  <div class="option-edit">
                    <input type="radio" id="retainer2" name="dealTime" value="retainer" />
                    <label for="retainer">Retainer </label>
                  </div>
    
                  <div class="option-edit">
                    <input type="radio" id="hourly2" name="dealTime" value="hourly" />
                    <label for="hourly">Hourly </label>
                  </div>
    
                  <div class="option-edit">
                    <input type="radio" id="project2" name="dealTime" value="project" />
                    <label for="project">Project </label>
                  </div>
    
                  <div class="option-edit">
                    <input type="radio" id="all2" name="dealTime" value="all" />
                    <label for="all">All </label>
                  </div>
                </div>
                <div class="selected-edit">
                  <div class="selected__img">
                    <img src="./img/maletin.svg" alt="" />
                  </div>
                  <div class="selected__work">
                    <p>סוג עסקה</p>
                  </div>
                </div>
              </div>
              </div>
              <div class="select-box-edit">
                <div class="options-container-edit">

                    <div class="option-edit">
                    <input type="radio" id="10" name="callLimitPerDay" value="10">
                    <label for="10">10 minutes per day</label>
                    </div>

                    <div class="option-edit">
                    <input type="radio" id="30" name="callLimitPerDay" value="30">
                    <label for="30">30 minutes per day</label>
                    </div>

                    <div class="option-edit">
                    <input type="radio" id="withOutLimit" name="callLimitPerDay" value="withOutLimit">
                <label for="withOutLimit">With Out Limits:</label>
                    </div>
               
                </div>
                <div class="selected-edit">
              <div class="selected__img">
                <img src="./img/maletin.svg" alt="" />
              </div>
              <div class="selected__work">
                <p>סוג עסקה</p>
              </div>
            </div>
              
              </div>
           



              <input type="submit" value="Update client" class="button-form">
              </div>
              `;

    formEdit.innerHTML = html;
    clientIdEdit = foundClient.uuid;

   
    const selectedAllEdit = document.querySelectorAll(".selected-edit");

    selectedAllEdit.forEach((selected) => {
      const optionsContainerEdit = selected.previousElementSibling;
      const optionsListEdit =
        optionsContainerEdit.querySelectorAll(".option-edit");

      selected.addEventListener("click", () => {
        if (optionsContainerEdit.classList.contains("active")) {
          optionsContainerEdit.classList.remove("active");
        } else {
          let currentActive = document.querySelector(
            ".options-container-edit.active"
          );

          if (currentActive) {
            currentActive.classList.remove("active");
          }

          optionsContainerEdit.classList.add("active");
        }
      });
      optionsListEdit.forEach((o) => {
        o.addEventListener("click", () => {
          selected.innerHTML = o.querySelector("label").innerHTML;
          optionsContainerEdit.classList.remove("active");
          o.children[0].checked = true;
        });
      });
    });
    console.log(selectedAllEdit);
  } catch (error) {
    console.error(error);
  }
}
 

//In the "form Edit" I stablish the previous checked value that the element already has
function radioButtonCheck(dealTime) {
  try {
    const elementWithTheEvent = document.querySelector("#checkRadioButton");
    if (!elementWithTheEvent)
      throw new Error(
        "The is a problem finding the element to check the radio button"
      );

    const radioRetainer = document.querySelector("#retainer2");
    if (!radioRetainer)
      throw new Error(
        'The is a problem finding the element "retainer" radio button'
      );

    const radioHourly = document.querySelector("#hourly2");
    if (!radioHourly)
      throw new Error(
        'The is a problem finding the element "hourly" radio button'
      );

    const radioProject = document.querySelector("#project2");
    if (!radioProject)
      throw new Error(
        'The is a problem finding the element "project" radio button'
      );

    const radioAll = document.querySelector("#all2");
    if (!radioAll)
      throw new Error(
        'The is a problem finding the element "all" radio button'
      );

    switch (dealTime) {
      case "retainer":
        radioRetainer.checked = true;
        break;

      case "hourly":
        radioHourly.checked = true;
        break;

      case "project":
        radioProject.checked = true;
        break;

      case "all":
        radioAll.checked = true;
        break;
    }

    //With this the event is going to happen only once
    elementWithTheEvent.onmouseenter = null;
  } catch (error) {
    console.error(error);
  }
}

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

    if (!modalEdit)
      throw new Error("There is a problem finding modalEdit from HTML");
    modalEdit.style.display = "none";
    ev.target.reset();

    const clientDetails = { clientname, phone, email, dealTime };
    const allClients = await axios.put(
      `/clients/editClient/${clientIdEdit}`,
      clientDetails
    );
    renderClients(allClients);
  } catch (error) {
    alert(error);
    swal("Ohhh no!", `${error}`, "warning");
    console.error(error);
  }
}
 */


//Handle the form to create a new Client:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener("submit", handleNewClient);

async function handleNewClient(ev) {
  try {
    ev.preventDefault();
    let { clientname, phone, email, dealTime, callLimitPerDay } =
      ev.target.elements;
    clientname = clientname.value;
    phone = phone.value;
    email = email.value;
    dealTime = dealTime.value;
    callLimitPerDay = callLimitPerDay.value;

    modalCreate.style.display = "none";
    ev.target.reset();

    const clientDetails = {
      clientname,
      phone,
      email,
      dealTime,
      callLimitPerDay,
    };
    const clientsCreated = await axios.post("/clients/register", clientDetails);
    swal("Good job!", "New user added succesfully!", "success");
    renderClients(clientsCreated.data.allClients.clients);
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
      const { clients } = clientsInfo.data.allClients;
      clientsToShow = clients;
    }

    let html = clientsToShow
      .map((element) => {
        return `<tr>
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
                    <input type="text" name="phone" value="${foundClient.phone}" placeholder="Phone" required>
                </div>

                <div class="form__wrapper">
                    <input type="email" name="email" value="${foundClient.email}" placeholder="Email" required>
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
    clientIdEdit = foundClient.uuid;

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

    if (!clientname || !phone || !email || !dealTime || !callLimitPerDay)
      throw new Error("You need to complete all the fields");

    if (!modalEdit)
      throw new Error("There is a problem finding modalEdit from HTML");
    modalEdit.style.display = "none";
    ev.target.reset();

    const clientDetails = { clientname, phone, email, dealTime, callLimitPerDay };
    const allClients = await axios.put(
      `/clients/editClient/${clientIdEdit}`,
      clientDetails
    );
    renderClients(allClients);
  } catch (error) {
    swal("Ohhh no!", `${error}`, "warning");
    console.error(error);
  }
}
