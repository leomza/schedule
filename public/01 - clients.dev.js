"use strict";

//   //Handle the form to create a new Client:
// const handleForm = document.querySelector("#formCreate");
// handleForm.addEventListener("submit", handleNewClient);
// async function handleNewClient(ev) {
//   try {
//     ev.preventDefault();
//     let { clientname, phone, email, dealTime, callLimitPerDay } =
//       ev.target.elements;
//     clientname = clientname.value;
//     phone = phone.value;
//     email = email.value;
//     dealTime = dealTime.value;
//     callLimitPerDay = callLimitPerDay.value;
//     modalCreate.style.display = "none";
//     ev.target.reset();
//     const clientDetails = {
//       clientname,
//       phone,
//       email,
//       dealTime,
//       callLimitPerDay,
//     };
//     const clientsCreated = await axios.post("/clients/register", clientDetails);
//     swal("Good job!", "New user added succesfully!", "success");
//     renderClients(clientsCreated.data.allClients.clients);
//   } catch (error) {
//     console.error(error);
//   }
// }
// // !Render all the clients
// async function renderClients(clientsToShow) {
//   try {
//     const table = document.querySelector(".table");
//     if (!table) throw new Error("There is a problem finding table from HTML");
//     if (!clientsToShow) {
//       const clientsInfo = await axios.get(`/clients/getAllClients`);
//       const { clients } = clientsInfo.data.allClients;
//       clientsToShow = clients;
//     }
//     let html = clientsToShow
//       .map((element) => {
//         return `<tr>
//             <td>${element.clientname}</td>
//             <td>${element.phone}</td> 
//             <td>${element.email}</td>
//             <td>${element.dealTime}</td>  
//             <td>${element.callLimitPerDay}</td>  
//             <td class="icons">
// <div class="icons__update">
//             <img  src="./img/update.svg" alt="" class="table__edit" onclick='editClient("${element.uuid}")' title="Edit"> 
//             </div>
//             <div class="icons__delete">
//           <img src="./img/delete.svg" alt="" class="table__remove" onclick='removeClient("${element.uuid}", "${element.clientname}")' title="Remove"> 
//           </div>
//           </td> 
//             </tr>`;
//       })
//       .join("");
//     table.innerHTML = html;
//   } catch (error) {
//     swal("Ohhh no!", error.response.data, "warning");
//     console.error(error);
//   }
// }
// // SELECT BOX
// const optionsContainer = document.querySelector(".options-container");
// const optionsList = document.querySelectorAll(".option");
// const selectedAll = document.querySelectorAll(".selected");
// selectedAll.forEach((selected) => {
//   const optionsContainer = selected.previousElementSibling;
//   const optionsList = optionsContainer.querySelectorAll(".option");
//   selected.addEventListener("click", () => {
//     if (optionsContainer.classList.contains("active")) {
//       optionsContainer.classList.remove("active");
//     } else {
//       let currentActive = document.querySelector(".options-container.active");
//       if (currentActive) {
//         currentActive.classList.remove("active");
//       }
//       optionsContainer.classList.add("active");
//     }
//   });
//   optionsList.forEach((o) => {
//     o.addEventListener("click", () => {
//       selected.innerHTML = o.querySelector("label").innerHTML;
//       optionsContainer.classList.remove("active");
//       o.children[0].checked = true;
//     });
//   });
// });
// //! Delete a client
// function removeClient(clientId, clientName) {
//   try {
//     swal({
//       title: "Are you sure?",
//       text: `Once deleted, you will not be able to recover this client ${clientName}!`,
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         deleteClient(clientId);
//       } else {
//         swal("Your client is safe!");
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
// async function deleteClient(clientId) {
//   try {
//     const clientsInfo = await axios.delete(`/clients/deleteClient/${clientId}`);
//     renderClients(clientsInfo.data.allClients.clients);
//   } catch (error) {
//     console.error(error);
//   }
// }
// //! Update a client:
// // ?This will contain the Client Id to Edit
// let clientIdEdit;
// async function editClient(uuidClient) {
//   try {
//     if (!modalEdit)
//       throw new Error("There is a problem finding the modal in the HTML");
//     modalEdit.style.display = "block";
//     modalEdit.classList.add("showModal");
//     const formEdit = document.querySelector("#formEdit");
//     console.log(formEdit);
//     if (!formEdit) throw new Error("There is a problem finding form from HTML");
//     const clientFound = await axios.get(`clients/findClient/${uuidClient}`);
//     const { foundClient } = clientFound.data;
//     let html = `
//                 <div id="checkRadioButton" onmouseenter='radioButtonCheck("${foundClient.dealTime}")'>
//                  <h3>Edit client</h3>
//                 <div class="form__wrapper">
//                     <input type="text" name="clientname" value="${foundClient.clientname}" placeholder="Clientname" required>
//                 </div>
//                 <div class="form__wrapper">
//                     <input type="text" name="phone" value="${foundClient.phone}" placeholder="Phone" required>
//                 </div>
//                 <div class="form__wrapper">
//                     <input type="email" name="email" value="${foundClient.email}" placeholder="Email" required>
//                 </div>
//                 <div class="select-box-edit">
//                 <div class="options-container-edit">
//                   <div class="option-edit">
//                     <input type="radio" id="retainer2" name="dealTime" value="retainer" />
//                     <label for="retainer">Retainer </label>
//                   </div>
//                   <div class="option-edit">
//                     <input type="radio" id="hourly2" name="dealTime" value="hourly" />
//                     <label for="hourly">Hourly </label>
//                   </div>
//                   <div class="option-edit">
//                     <input type="radio" id="project2" name="dealTime" value="project" />
//                     <label for="project">Project </label>
//                   </div>
//                   <div class="option-edit">
//                     <input type="radio" id="all2" name="dealTime" value="all" />
//                     <label for="all">All </label>
//                   </div>
//                 </div>
//                 <div class="selected-edit">
//                   <div class="selected__img">
//                     <img src="./img/maletin.svg" alt="" />
//                   </div>
//                   <div class="selected__work">
//                     <p>סוג עסקה</p>
//                   </div>
//                 </div>
//               </div>
//               </div>
//               <div class="select-box-edit">
//                 <div class="options-container-edit">
//                     <div class="option-edit">
//                     <input type="radio" id="10" name="callLimitPerDay" value="10">
//                     <label for="10">10 minutes per day</label>
//                     </div>
//                     <div class="option-edit">
//                     <input type="radio" id="30" name="callLimitPerDay" value="30">
//                     <label for="30">30 minutes per day</label>
//                     </div>
//                     <div class="option-edit">
//                     <input type="radio" id="withOutLimit" name="callLimitPerDay" value="withOutLimit">
//                 <label for="withOutLimit">With Out Limits:</label>
//                     </div>
//                 </div>
//                 <div class="selected-edit">
//               <div class="selected__img">
//                 <img src="./img/maletin.svg" alt="" />
//               </div>
//               <div class="selected__work">
//                 <p>סוג עסקה</p>
//               </div>
//             </div>
//               </div>
//               <input type="submit" value="Update client" class="button-form">
//               </div>
//               `;
//     formEdit.innerHTML = html;
//     clientIdEdit = foundClient.uuid;
//     const selectedAllEdit = document.querySelectorAll(".selected-edit");
//     selectedAllEdit.forEach((selected) => {
//       const optionsContainerEdit = selected.previousElementSibling;
//       const optionsListEdit =
//         optionsContainerEdit.querySelectorAll(".option-edit");
//       selected.addEventListener("click", () => {
//         if (optionsContainerEdit.classList.contains("active")) {
//           optionsContainerEdit.classList.remove("active");
//         } else {
//           let currentActive = document.querySelector(
//             ".options-container-edit.active"
//           );
//           if (currentActive) {
//             currentActive.classList.remove("active");
//           }
//           optionsContainerEdit.classList.add("active");
//         }
//       });
//       optionsListEdit.forEach((o) => {
//         o.addEventListener("click", () => {
//           selected.innerHTML = o.querySelector("label").innerHTML;
//           optionsContainerEdit.classList.remove("active");
//           o.children[0].checked = true;
//         });
//       });
//     });
//     console.log(selectedAllEdit);
//   } catch (error) {
//     console.error(error);
//   }
// }
// //! In the "form Edit" I stablish the previous checked value that the element already has
// function radioButtonCheck(dealTime) {
//   try {
//     const elementWithTheEvent = document.querySelector("#checkRadioButton");
//     if (!elementWithTheEvent)
//       throw new Error(
//         "The is a problem finding the element to check the radio button"
//       );
//     const radioRetainer = document.querySelector("#retainer2");
//     if (!radioRetainer)
//       throw new Error(
//         'The is a problem finding the element "retainer" radio button'
//       );
//     const radioHourly = document.querySelector("#hourly2");
//     if (!radioHourly)
//       throw new Error(
//         'The is a problem finding the element "hourly" radio button'
//       );
//     const radioProject = document.querySelector("#project2");
//     if (!radioProject)
//       throw new Error(
//         'The is a problem finding the element "project" radio button'
//       );
//     const radioAll = document.querySelector("#all2");
//     if (!radioAll)
//       throw new Error(
//         'The is a problem finding the element "all" radio button'
//       );
//     switch (dealTime) {
//       case "retainer":
//         radioRetainer.checked = true;
//         break;
//       case "hourly":
//         radioHourly.checked = true;
//         break;
//       case "project":
//         radioProject.checked = true;
//         break;
//       case "all":
//         radioAll.checked = true;
//         break;
//     }
//     //? With this the event is going to happen only once
//     elementWithTheEvent.onmouseenter = null;
//   } catch (error) {
//     console.error(error);
//   }
// }
// //! Handle Edit
// async function handleEdit(ev) {
//   try {
//     let { clientname, phone, email, dealTime } = ev.target.elements;
//     clientname = clientname.value;
//     phone = phone.value;
//     email = email.value;
//     dealTime = dealTime.value;
//     if (!clientname || !phone || !email || !dealTime)
//       throw new Error("You need to complete all the fields");
//     if (!modalEdit)
//       throw new Error("There is a problem finding modalEdit from HTML");
//     modalEdit.style.display = "none";
//     ev.target.reset();
//     const clientDetails = { clientname, phone, email, dealTime };
//     const allClients = await axios.put(
//       `/clients/editClient/${clientIdEdit}`,
//       clientDetails
//     );
//     renderClients(allClients);
//   } catch (error) {
//     alert(error);
//     swal("Ohhh no!", `${error}`, "warning");
//     console.error(error);
//   }
// }
//LEO
//Handle the form to create a new Client:
var handleForm = document.querySelector("#formCreate");
handleForm.addEventListener("submit", handleNewClient);

function handleNewClient(ev) {
  var _ev$target$elements, clientname, phone, email, dealTime, callLimitPerDay, clientDetails, clientsCreated;

  return regeneratorRuntime.async(function handleNewClient$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ev.preventDefault();
          _ev$target$elements = ev.target.elements, clientname = _ev$target$elements.clientname, phone = _ev$target$elements.phone, email = _ev$target$elements.email, dealTime = _ev$target$elements.dealTime, callLimitPerDay = _ev$target$elements.callLimitPerDay;
          clientname = clientname.value;
          phone = phone.value;
          email = email.value;
          dealTime = dealTime.value;
          callLimitPerDay = callLimitPerDay.value;
          modalCreate.style.display = "none";
          ev.target.reset();
          clientDetails = {
            clientname: clientname,
            phone: phone,
            email: email,
            dealTime: dealTime,
            callLimitPerDay: callLimitPerDay
          };
          _context.next = 13;
          return regeneratorRuntime.awrap(axios.post('/clients/register', clientDetails));

        case 13:
          clientsCreated = _context.sent;
          swal("Good job!", "New user added succesfully!", "success");
          renderClients(clientsCreated.data.allClients.clients);
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
} //Render all the clients


function renderClients(clientsToShow) {
  var table, clientsInfo, clients, html;
  return regeneratorRuntime.async(function renderClients$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          table = document.querySelector(".table");

          if (table) {
            _context2.next = 4;
            break;
          }

          throw new Error("There is a problem finding table from HTML");

        case 4:
          if (clientsToShow) {
            _context2.next = 10;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 7:
          clientsInfo = _context2.sent;
          clients = clientsInfo.data.allClients.clients;
          clientsToShow = clients;

        case 10:
          html = clientsToShow.map(function (element) {
            return "<tr>\n            <td>".concat(element.clientname, "</td>\n            <td>").concat(element.phone, "</td> \n            <td>").concat(element.email, "</td>\n            <td>").concat(element.dealTime, "</td>  \n            <td>").concat(element.callLimitPerDay, "</td>  \n             \n            <td class=\"icons\">\n             \n            <img  src=\"./img/update.svg\" alt=\"\" class=\"table__edit\" onclick='editClient(\"").concat(element.uuid, "\")' title=\"Edit\"> \n            \n          <img src=\"./img/delete.svg\" alt=\"\" class=\"table__remove\" onclick='removeClient(\"").concat(element.uuid, "\", \"").concat(element.clientname, "\")' title=\"Remove\"> \n          \n          </td> \n             \n            </tr>");
          }).join("");
          table.innerHTML = html;
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          swal("Ohhh no!", _context2.t0.response.data, "warning");
          console.error(_context2.t0);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
} //Delete a client


function removeClient(clientId, clientName) {
  try {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this client ".concat(clientName, "!"),
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(function (willDelete) {
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

function deleteClient(clientId) {
  var clientsInfo;
  return regeneratorRuntime.async(function deleteClient$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(axios["delete"]("/clients/deleteClient/".concat(clientId)));

        case 3:
          clientsInfo = _context3.sent;
          renderClients(clientsInfo.data.allClients.clients);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
} //Update a client:
//This will contain the Client Id to Edit


var clientIdEdit;

function editClient(uuidClient) {
  var formEdit, clientFound, foundClient, html;
  return regeneratorRuntime.async(function editClient$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (modalEdit) {
            _context4.next = 3;
            break;
          }

          throw new Error("There is a problem finding the modal in the HTML");

        case 3:
          modalEdit.style.display = "block";
          modalEdit.classList.add("showModal");
          formEdit = document.querySelector("#formEdit");

          if (formEdit) {
            _context4.next = 8;
            break;
          }

          throw new Error("There is a problem finding form from HTML");

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(axios.get("clients/findClient/".concat(uuidClient)));

        case 10:
          clientFound = _context4.sent;
          foundClient = clientFound.data.foundClient;
          html = "\n                <div>\n                 <h3>Edit client</h3>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"text\" name=\"clientname\" value=\"".concat(foundClient.clientname, "\" placeholder=\"Clientname\" required>\n                </div>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"text\" name=\"phone\" value=\"").concat(foundClient.phone, "\" placeholder=\"Phone\" required>\n                </div>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"email\" name=\"email\" value=\"").concat(foundClient.email, "\" placeholder=\"Email\" required>\n                </div>\n\n                <div class=\"form__wrapper\">\n                <select class=\"form__wrapper--select\" name=\"dealTime\" id=\"dealTime\">\n                      <option value=\"").concat(foundClient.dealTime, "\" selected disabled hidden>").concat(foundClient.dealTime, "</option>\n                      <option value=\"retainer\">Retainer</option>\n                      <option value=\"hourly\">Hourly</option>\n                      <option value=\"project\">Project</option>\n                      <option value=\"all\">All</option>\n                </select>\n                </div>\n\n                <div class=\"form__wrapper\">\n                <select class=\"form__wrapper--select\" name=\"callLimitPerDay\" id=\"callLimitPerDay\">\n                      <option value=\"").concat(foundClient.callLimitPerDay, "\" selected disabled hidden>").concat(foundClient.callLimitPerDay, " minutes per day</option>\n                      <option value=\"10\">10 minutes per day</option>\n                      <option value=\"30\">30 minutes per day</option>\n                      <option value=\"withOutLimits\">With Out Limits</option>\n                </select>\n                </div>\n\n              <input type=\"submit\" value=\"Update client\" class=\"button-form\">\n              </div>\n              ");
          formEdit.innerHTML = html;
          clientIdEdit = foundClient.uuid;
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 17]]);
} //Handle Edit


function handleEdit(ev) {
  var _ev$target$elements2, clientname, phone, email, dealTime, callLimitPerDay, clientDetails, allClients;

  return regeneratorRuntime.async(function handleEdit$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _ev$target$elements2 = ev.target.elements, clientname = _ev$target$elements2.clientname, phone = _ev$target$elements2.phone, email = _ev$target$elements2.email, dealTime = _ev$target$elements2.dealTime, callLimitPerDay = _ev$target$elements2.callLimitPerDay;
          clientname = clientname.value;
          phone = phone.value;
          email = email.value;
          dealTime = dealTime.value;
          callLimitPerDay = callLimitPerDay.value;

          if (!(!clientname || !phone || !email || !dealTime || !callLimitPerDay)) {
            _context5.next = 9;
            break;
          }

          throw new Error("You need to complete all the fields");

        case 9:
          if (modalEdit) {
            _context5.next = 11;
            break;
          }

          throw new Error("There is a problem finding modalEdit from HTML");

        case 11:
          modalEdit.style.display = "none";
          ev.target.reset();
          clientDetails = {
            clientname: clientname,
            phone: phone,
            email: email,
            dealTime: dealTime,
            callLimitPerDay: callLimitPerDay
          };
          _context5.next = 16;
          return regeneratorRuntime.awrap(axios.put("/clients/editClient/".concat(clientIdEdit), clientDetails));

        case 16:
          allClients = _context5.sent;
          renderClients(allClients);
          _context5.next = 24;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);
          swal("Ohhh no!", "".concat(_context5.t0), "warning");
          console.error(_context5.t0);

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 20]]);
}