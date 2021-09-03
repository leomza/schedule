"use strict";

//Handle the form to create a new Project:
var handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewProject);

function handleNewProject(ev) {
  var _ev$target$elements, projectName, clientId, projectType, status, totalHours, projectDetails, projectsCreated;

  return regeneratorRuntime.async(function handleNewProject$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ev.preventDefault();
          _ev$target$elements = ev.target.elements, projectName = _ev$target$elements.projectName, clientId = _ev$target$elements.clientId, projectType = _ev$target$elements.projectType, status = _ev$target$elements.status, totalHours = _ev$target$elements.totalHours;
          projectName = projectName.value;
          clientId = selectClientName.value;
          projectType = projectType.value;
          status = status.value;
          totalHours = totalHours.valueAsNumber;
          modalCreate.style.display = "none";
          ev.target.reset();
          projectDetails = {
            projectName: projectName,
            clientId: clientId,
            projectType: projectType,
            status: status,
            totalHours: totalHours
          };
          _context.next = 13;
          return regeneratorRuntime.awrap(axios.post('/projects/addNew', projectDetails));

        case 13:
          projectsCreated = _context.sent;
          swal("Good job!", "New project added succesfully!", "success");
          renderProjects(projectsCreated.data.allProjects.projects);
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
} //Function to get the names of the client in the "select Client Name"


function uploadClientNames() {
  var clientsInfo, clients, select, index, option;
  return regeneratorRuntime.async(function uploadClientNames$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 3:
          clientsInfo = _context2.sent;
          clients = clientsInfo.data.allClients.clients;
          select = document.getElementById('selectClientName');

          for (index = 0; index < clients.length; index++) {
            option = document.createElement('option');
            option.value = clients[index].uuid;
            option.innerHTML = clients[index].clientname;
            select.appendChild(option);
          }

          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
} //Render all the projects


function renderProjects(projectsToShow) {
  var table, clientsInfo, clients, projectsInfo, projects, _loop, index, html;

  return regeneratorRuntime.async(function renderProjects$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          table = document.querySelector('.table');

          if (table) {
            _context3.next = 4;
            break;
          }

          throw new Error('There is a problem finding table from HTML');

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 6:
          clientsInfo = _context3.sent;
          clients = clientsInfo.data.allClients.clients;

          if (projectsToShow) {
            _context3.next = 14;
            break;
          }

          _context3.next = 11;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllprojects"));

        case 11:
          projectsInfo = _context3.sent;
          projects = projectsInfo.data.allProjects.projects;
          projectsToShow = projects;

        case 14:
          _loop = function _loop(index) {
            var project = projectsToShow[index];
            clients.forEach(function (client) {
              if (client.uuid === project.clientId) {
                Object.assign(projectsToShow[index], client);
              }
            });
          };

          //Add the information of the user to the project
          for (index = 0; index < projectsToShow.length; index++) {
            _loop(index);
          }

          ;
          html = projectsToShow.map(function (element) {
            return "<tr>\n                <td>".concat(element.projectName, "</td>\n                <td>").concat(element.clientname, "</td>\n                <td>").concat(element.projectType, "</td>\n                <td>").concat(element.callLimitPerDay, "</td>\n                <td>").concat(element.totalHours, " / ").concat(element.usedHours, "</td>\n                <td>").concat(element.status, "</td>\n                <td>\n                <i class=\"fas fa-edit table__edit\" onclick='editProject(\"").concat(element.projectUuid, "\")' title=\"Edit\"></i>\n                <i class=\"fas fa-trash table__remove\" onclick='removeProject(\"").concat(element.projectUuid, "\", \"").concat(element.projectName, "\")' title=\"Remove\"></i>\n                </td>\n            </tr>");
          }).join('');
          table.innerHTML = html;
          _context3.next = 25;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          swal("Ohhh no!", _context3.t0.response.data, "warning");
          console.error(_context3.t0);

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 21]]);
} //Delete a project


function removeProject(projectId, projectName) {
  try {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this project ".concat(projectName, "!"),
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(function (willDelete) {
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

function deleteProject(projectId) {
  var projectsInfo;
  return regeneratorRuntime.async(function deleteProject$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(axios["delete"]("/projects/deleteProject/".concat(projectId)));

        case 3:
          projectsInfo = _context4.sent;
          renderProjects(projectsInfo.data.allProjects.projects);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
} //Update a project:
//This will contain the Project Id to Edit


var projectIdEdit;

function editProject(uuidProject) {
  var formEdit, projectFound, foundProject;
  return regeneratorRuntime.async(function editProject$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;

          if (modalEdit) {
            _context5.next = 3;
            break;
          }

          throw new Error('There is a problem finding the modal in the HTML');

        case 3:
          modalEdit.style.display = "block";
          modalEdit.classList.add("showModal");
          formEdit = document.querySelector("#formEdit");

          if (formEdit) {
            _context5.next = 8;
            break;
          }

          throw new Error('There is a problem finding form from HTML');

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(axios.get("projects/findProject/".concat(uuidProject)));

        case 10:
          projectFound = _context5.sent;
          foundProject = projectFound.data.foundProject; //Set the client Name

          showClientNameInDOM(foundProject.clientId).then(function (data) {
            var html = "\n        <div>\n        <label for=\"projectName\">Project Name:</label>\n        <input type=\"text\" name=\"projectName\" value=\"".concat(foundProject.projectName, "\" placeholder=\"Project name\" required>\n        </div>\n\n        <div>\n        <label for=\"selectClientName\">Select a client name</label>\n        <select onclick=\"uploadClientNamesEdit()\" name=\"selectClientName\" id=\"selectClientNameEdit\">\n        <option id=\"option").concat(foundProject.clientId, "\" value=\"").concat(foundProject.clientId, "\" selected disabled hidden>").concat(data, "</option>    \n        </select>\n        </div>\n\n        <div>\n        <label for=\"projectType\">Project Type:</label>\n        <select name=\"projectType\" id=\"projectType\">\n            <option value=\"").concat(foundProject.projectType, "\" selected disabled hidden>").concat(foundProject.projectType, "</option>\n            <option value=\"logo\">Logo</option>\n            <option value=\"graphicLanguage\">Graphic Language</option>\n            <option value=\"corporateWebsite\">Corporate Website</option>\n            <option value=\"landingPage\">Landing Page</option>\n            <option value=\"ecommerce\">Ecommerce</option>\n            <option value=\"branding\">Branding</option>\n            <option value=\"post\">Post</option>\n            <option value=\"packageDesign\">Package Design</option>\n            <option value=\"banner\">Banner</option>\n            <option value=\"rollUp\">Roll Up</option>\n            <option value=\"flyer\">Flyer</option>\n            <option value=\"digitalBook\">Digital Book</option>\n            <option value=\"newsLetter\">News Letter</option>\n            <option value=\"calendar\">Calendar</option>\n            <option value=\"businessCard\">Business Card</option>\n            <option value=\"presentation\">Presentation</option>\n            <option value=\"designedPage\">Designed Page</option>\n        </select>\n        </div>\n\n        <div>\n        <label for=\"status\">Status:</label>\n        <select name=\"status\" id=\"status\">\n            <option value=\"").concat(foundProject.status, "\" selected disabled hidden>").concat(foundProject.status, "</option>\n            <option value=\"offerPending\">Offer Pending</option>\n            <option value=\"inProgress\">In Progress</option>\n            <option value=\"offerApproved\">Offer Approved</option>\n            <option value=\"stuck\">Stuck</option>\n            <option value=\"paidUp\">Paid Up</option>\n            <option value=\"waitingForSketchApproval\">Waiting for Sketch Approval</option>\n            <option value=\"postponed\">Postponed</option>\n            <option value=\"canceled\">Canceled</option>\n            <option value=\"finished\">Finished</option>\n        </select>\n        </div>\n\n        <div>\n            <label for=\"totalHours\">Total hours for the project</label>\n            <input type=\"number\" name=\"totalHours\" value=\"").concat(foundProject.totalHours, "\" placeholder=\"Total Hours for the project\">\n        </div>\n                <input type=\"submit\" value=\"Update project\">\n        ");
            formEdit.innerHTML = html;
            projectIdEdit = foundProject.projectUuid;
          });
          _context5.next = 18;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
} //Function to show the client name in the Edit DOM


function showClientNameInDOM(clientId) {
  var clientFound;
  return regeneratorRuntime.async(function showClientNameInDOM$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(axios.get("clients/findClient/".concat(clientId)));

        case 2:
          clientFound = _context6.sent;
          return _context6.abrupt("return", clientFound.data.foundClient.clientname);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
} //Handle Edit


function handleEdit(ev) {
  var _ev$target$elements2, projectName, clientId, projectType, status, totalHours, projectDetails, allProjects;

  return regeneratorRuntime.async(function handleEdit$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _ev$target$elements2 = ev.target.elements, projectName = _ev$target$elements2.projectName, clientId = _ev$target$elements2.clientId, projectType = _ev$target$elements2.projectType, status = _ev$target$elements2.status, totalHours = _ev$target$elements2.totalHours;
          projectName = projectName.value;
          clientId = selectClientNameEdit.value;
          projectType = projectType.value;
          status = status.value;
          totalHours = totalHours.valueAsNumber;

          if (!(!projectName || !clientId || !projectType || !status || !totalHours)) {
            _context7.next = 9;
            break;
          }

          throw new Error("You need to complete all the fields");

        case 9:
          if (modalEdit) {
            _context7.next = 11;
            break;
          }

          throw new Error('There is a problem finding modalEdit from HTML');

        case 11:
          modalEdit.style.display = "none";
          ev.target.reset();
          projectDetails = {
            projectName: projectName,
            clientId: clientId,
            projectType: projectType,
            status: status,
            totalHours: totalHours
          };
          _context7.next = 16;
          return regeneratorRuntime.awrap(axios.put("/projects/editProject/".concat(projectIdEdit), projectDetails));

        case 16:
          allProjects = _context7.sent;
          renderClients(allProjects);
          _context7.next = 24;
          break;

        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7["catch"](0);
          swal("Ohhh no!", "".concat(_context7.t0), "warning");
          console.error(_context7.t0);

        case 24:
          ;

        case 25:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 20]]);
}

; //Function to get the names of the client in the "select Client Name"

function uploadClientNamesEdit() {
  var clientsInfo, _clients, select, index, option;

  return regeneratorRuntime.async(function uploadClientNamesEdit$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 3:
          clientsInfo = _context8.sent;
          _clients = clientsInfo.data.allClients.clients;
          select = document.getElementById('selectClientNameEdit');

          for (index = 0; index < _clients.length; index++) {
            option = document.createElement('option');
            option.value = _clients[index].uuid;
            option.innerHTML = _clients[index].clientname;
            select.appendChild(option);
          } //The event is going to happen just once


          select.onclick = null;
          _context8.next = 13;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 10]]);
}