"use strict";

//Handle the form to create a new Client:
var handleFormClient = document.querySelector("#formCreate");
handleFormClient.addEventListener("submit", handleNewClient);

function handleNewClient(ev) {
  var _ev$target$elements, clientname, phone, email, dealTime, callLimitPerDay, clientDetails;

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
          swal("Good job!", "New user added succesfully!", "success").then(function () {
            renderClients();
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
} //Render all the clients


function renderClients(clientsToShow) {
  var table, clientsInfo, html;
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
            _context2.next = 9;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 7:
          clientsInfo = _context2.sent;
          clientsToShow = clientsInfo.data.infoClients;

        case 9:
          html = clientsToShow.map(function (element) {
            return "<tr>\n            <td>".concat(element.clientname, "</td>\n            <td>").concat(element.phone, "</td> \n            <td>").concat(element.email, "</td>\n            <td>").concat(element.dealTime, "</td>  \n            <td>").concat(element.callLimitPerDay, "</td>  \n             \n            <td class=\"icons\">\n             \n            <img  src=\"./img/update.svg\" alt=\"\" class=\"table__edit\" onclick='editClient(\"").concat(element.id, "\")' title=\"Edit\"> \n            \n          <img src=\"./img/delete.svg\" alt=\"\" class=\"table__remove\" onclick='removeClient(\"").concat(element.id, "\", \"").concat(element.clientname, "\")' title=\"Remove\"> \n          \n          </td> \n             \n            </tr>");
          }).join("");
          table.innerHTML = html;
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          swal("Ohhh no!", _context2.t0.response.data, "warning");
          console.error(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
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
  return regeneratorRuntime.async(function deleteClient$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(axios["delete"]("/clients/deleteClient/".concat(clientId)));

        case 3:
          renderClients();
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
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
          html = "\n                <div>\n                 <h3>Edit client</h3>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"text\" name=\"clientname\" value=\"".concat(foundClient.clientname, "\" placeholder=\"Clientname\" required>\n                </div>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"text\" name=\"phone\" value=\"").concat(foundClient.phone, "\" placeholder=\"Phone\">\n                </div>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"email\" name=\"email\" value=\"").concat(foundClient.email, "\" placeholder=\"Email\">\n                </div>\n\n                <div class=\"form__wrapper\">\n                <select class=\"form__wrapper--select\" name=\"dealTime\" id=\"dealTime\">\n                      <option value=\"").concat(foundClient.dealTime, "\" selected disabled hidden>").concat(foundClient.dealTime, "</option>\n                      <option value=\"retainer\">Retainer</option>\n                      <option value=\"hourly\">Hourly</option>\n                      <option value=\"project\">Project</option>\n                      <option value=\"all\">All</option>\n                </select>\n                </div>\n\n                <div class=\"form__wrapper\">\n                <select class=\"form__wrapper--select\" name=\"callLimitPerDay\" id=\"callLimitPerDay\">\n                      <option value=\"").concat(foundClient.callLimitPerDay, "\" selected disabled hidden>").concat(foundClient.callLimitPerDay, " minutes per day</option>\n                      <option value=\"10\">10 minutes per day</option>\n                      <option value=\"30\">30 minutes per day</option>\n                      <option value=\"withOutLimits\">With Out Limits</option>\n                </select>\n                </div>\n\n              <input type=\"submit\" value=\"Update client\" class=\"button-form\">\n              </div>\n              ");
          formEdit.innerHTML = html;
          clientIdEdit = foundClient.id;
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
  var _ev$target$elements2, clientname, phone, email, dealTime, callLimitPerDay, clientDetails;

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

          if (!(!clientname || !dealTime || !callLimitPerDay)) {
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
          renderClients();
          _context5.next = 23;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          swal("Ohhh no!", "".concat(_context5.t0), "warning");
          console.error(_context5.t0);

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 19]]);
}