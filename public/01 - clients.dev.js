"use strict";

//Handle the form to create a new Client:
var handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewClient);

function handleNewClient(ev) {
  var _ev$target$elements, clientname, phone, email, projectType, callLimitPerDay, clientDetails, clientsCreated;

  return regeneratorRuntime.async(function handleNewClient$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ev.preventDefault();
          _ev$target$elements = ev.target.elements, clientname = _ev$target$elements.clientname, phone = _ev$target$elements.phone, email = _ev$target$elements.email, projectType = _ev$target$elements.projectType, callLimitPerDay = _ev$target$elements.callLimitPerDay;
          clientname = clientname.value;
          phone = phone.value;
          email = email.value;
          projectType = projectType.value;
          callLimitPerDay = callLimitPerDay.value;
          modalCreate.style.display = "none";
          ev.target.reset();
          clientDetails = {
            clientname: clientname,
            phone: phone,
            email: email,
            projectType: projectType,
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
          table = document.querySelector('.table');

          if (table) {
            _context2.next = 4;
            break;
          }

          throw new Error('There is a problem finding table from HTML');

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
            return "<tr>\n            <td>".concat(element.clientname, "</td>\n            <td>").concat(element.phone, "</td> \n            <td>").concat(element.email, "</td>\n            <td>").concat(element.projectType, "</td>  \n            <td>").concat(element.callLimitPerDay, "</td>  \n             \n            <td class=\"icons\">\n<div class=\"icons__update\">\n            <img  src=\"./img/update.svg\" alt=\"\" class=\"table__edit\" onclick='editClient(\"").concat(element.uuid, "\")' title=\"Edit\"> \n            </div>\n            <div class=\"icons__delete\">\n          <img src=\"./img/delete.svg\" alt=\"\" class=\"table__remove\" onclick='removeClient(\"").concat(element.uuid, "\", \"").concat(element.clientname, "\")' title=\"Remove\"> \n          </div>\n          </td> \n             \n            </tr>");
          }).join('');
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

          throw new Error('There is a problem finding the modal in the HTML');

        case 3:
          modalEdit.style.display = "block";
          modalEdit.classList.add("showModal");
          formEdit = document.querySelector("#formEdit");

          if (formEdit) {
            _context4.next = 8;
            break;
          }

          throw new Error('There is a problem finding form from HTML');

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(axios.get("clients/findClient/".concat(uuidClient)));

        case 10:
          clientFound = _context4.sent;
          foundClient = clientFound.data.foundClient;
          html = "\n                <div id=\"checkRadioButton\" onmouseenter='radioButtonCheck(\"".concat(foundClient.projectType, "\")'>\n                 <h3>Edit client</h3>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"text\" name=\"clientname\" value=\"").concat(foundClient.clientname, "\" placeholder=\"Clientname\" required>\n                </div>\n\n\n                <div class=\"form__wrapper\">\n                    <input type=\"text\" name=\"phone\" value=\"").concat(foundClient.phone, "\" placeholder=\"Phone\" required>\n                </div>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"email\" name=\"email\" value=\"").concat(foundClient.email, "\" placeholder=\"Email\" required>\n                </div>\n\n                <div>\n                <label for=\"branding2\">Branding:</label>\n                <input type=\"radio\" id=\"branding2\" name=\"projectType\" value=\"branding\">\n    \n                <label for=\"design2\">Design:</label>\n                <input type=\"radio\" id=\"design2\" name=\"projectType\" value=\"design\">\n    \n                <label for=\"business2\">Business:</label>\n                <input type=\"radio\" id=\"business2\" name=\"projectType\" value=\"business\">\n    \n                </div>\n                <input type=\"submit\" value=\"Update client\">\n                </div>");
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
} //SELECT BOX


var selected = document.querySelector(".selected");
var optionsContainer = document.querySelector(".options-container");
var optionsList = document.querySelectorAll(".option");
var btn = document.querySelector('.button-form'); // selected.addEventListener("click", () => {
//     optionsContainer.classList.toggle("active");
//   });
//   optionsList.forEach(o => {
//     o.addEventListener("click", () => {
//       selected.innerHTML = o.querySelector("label").innerHTML;
//       optionsContainer.classList.remove("active");
//     });
//   });

var selectedAll = document.querySelectorAll(".selected");
selectedAll.forEach(function (selected) {
  var optionsContainer = selected.previousElementSibling;
  var optionsList = optionsContainer.querySelectorAll(".option");
  selected.addEventListener("click", function () {
    if (optionsContainer.classList.contains("active")) {
      optionsContainer.classList.remove("active");
    } else {
      var currentActive = document.querySelector(".options-container.active");

      if (currentActive) {
        currentActive.classList.remove("active");
      }

      optionsContainer.classList.add("active");
    }
  });
  optionsList.forEach(function (o) {
    o.addEventListener("click", function () {
      selected.innerHTML = o.querySelector("label").innerHTML;
      optionsContainer.classList.remove("active");
    });
  });
});
selected.addEventListener("click", function () {
  btn.classList.toggle("button-hiden");
}); //SELECT BOX-TIME
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

function radioButtonCheck(projectType) {
  try {
    var elementWithTheEvent = document.querySelector('#checkRadioButton');
    if (!elementWithTheEvent) throw new Error('The is a problem finding the element to check the radio button');
    var radioBranding = document.querySelector('#branding2');
    if (!radioBranding) throw new Error('The is a problem finding the element "branding" radio button');
    var radioDesign = document.querySelector('#design2');
    if (!radioDesign) throw new Error('The is a problem finding the element "design" radio button');
    var radioBusiness = document.querySelector('#business2');
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
    }

    ; //With this the event is going to happen only once

    elementWithTheEvent.onmouseenter = null;
  } catch (error) {
    console.error(error);
  }

  ;
}

; //Handle Edit

function handleEdit(ev) {
  var _ev$target$elements2, clientname, phone, email, projectType, clientDetails, allClients;

  return regeneratorRuntime.async(function handleEdit$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _ev$target$elements2 = ev.target.elements, clientname = _ev$target$elements2.clientname, phone = _ev$target$elements2.phone, email = _ev$target$elements2.email, projectType = _ev$target$elements2.projectType;
          clientname = clientname.value;
          phone = phone.value;
          email = email.value;
          projectType = projectType.value;

          if (!(!clientname || !phone || !email || !projectType)) {
            _context5.next = 8;
            break;
          }

          throw new Error("You need to complete all the fields");

        case 8:
          if (modalEdit) {
            _context5.next = 10;
            break;
          }

          throw new Error('There is a problem finding modalEdit from HTML');

        case 10:
          modalEdit.style.display = "none";
          ev.target.reset();
          clientDetails = {
            clientname: clientname,
            phone: phone,
            email: email,
            projectType: projectType
          };
          _context5.next = 15;
          return regeneratorRuntime.awrap(axios.put("/clients/editClient/".concat(clientIdEdit), clientDetails));

        case 15:
          allClients = _context5.sent;
          renderClients(allClients);
          _context5.next = 24;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          alert(_context5.t0);
          swal("Ohhh no!", "".concat(_context5.t0), "warning");
          console.error(_context5.t0);

        case 24:
          ;

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

;