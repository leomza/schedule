"use strict";

//Handle the form to create a new Project:
var handleFormProject = document.querySelector("#formCreateProject");
handleFormProject.addEventListener("submit", handleNewProject);

function handleNewProject(ev) {
  var _ev$target$elements, projectName, clientId, projectType, status, totalHours, projectDetails;

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
          totalHours = totalHours.valueAsNumber; //When I create from the project Dashboard

          modalCreate.style.display = "none"; //When I create from the task Dashboard

          if (modalCreateProject) {
            modalCreateProject.style.display = "none";
          }

          ev.target.reset();
          projectDetails = {
            projectName: projectName,
            clientId: clientId,
            projectType: projectType,
            status: status,
            totalHours: totalHours
          };
          _context.next = 14;
          return regeneratorRuntime.awrap(axios.post("/projects/addNew", projectDetails));

        case 14:
          swal("Good job!", "New project added succesfully!", "success");
          renderProjects();
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
          clients = clientsInfo.data.infoClients;
          select = document.getElementById("selectClientName");

          for (index = 0; index < clients.length; index++) {
            option = document.createElement("option");
            option.value = clients[index].id;
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
  var table, clientsInfo, clients, projectsInfo, _loop, index, projectToShowSorted, html;

  return regeneratorRuntime.async(function renderProjects$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          table = document.querySelector(".table");

          if (table) {
            _context3.next = 4;
            break;
          }

          throw new Error("There is a problem finding table from HTML");

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 6:
          clientsInfo = _context3.sent;
          clients = clientsInfo.data.infoClients;

          if (projectsToShow) {
            _context3.next = 13;
            break;
          }

          _context3.next = 11;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllprojects"));

        case 11:
          projectsInfo = _context3.sent;
          projectsToShow = projectsInfo.data.infoProjects;

        case 13:
          _loop = function _loop(index) {
            var project = projectsToShow[index];
            clients.forEach(function (client) {
              if (client.id === project.clientId) {
                Object.assign(projectsToShow[index], client);
              }
            });
          };

          //Add the information of the user to the project
          for (index = 0; index < projectsToShow.length; index++) {
            _loop(index);
          }

          projectToShowSorted = projectsToShow.sort(function (a, b) {
            return a.projectName.localeCompare(b.projectName);
          });
          html = projectToShowSorted.map(function (element) {
            timeInProject = convertTimeToMinuteAndHours(element.usedHours);
            timeSpendInDesign = convertTimeToMinuteAndHours(element.timeInDesign);
            return "<tr>\n                <td>".concat(element.projectName, "</td>\n                <td>").concat(element.clientname, "</td>\n                <td>").concat(element.projectType, "</td>\n                <td>").concat(element.callLimitPerDay, "</td>\n                <td>").concat(timeSpendInDesign, "</td>\n                <td>").concat(element.totalHours, ":00 / ").concat(timeInProject, "</td>\n                <td>").concat(element.status, "</td>\n                <td>\n                <img src=\"./img/edit.png\" alt=\"\" onclick='editProject(\"").concat(element.projectUuid, "\")' title=\"Edit\"> \n                <img src=\"./img/delete.png\" alt=\"\" onclick='removeProject(\"").concat(element.projectUuid, "\", \"").concat(element.projectName, "\")' title=\"Remove\">\n                </td>\n            </tr>");
          }).join("");
          table.innerHTML = html;
          _context3.next = 24;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          swal("Ohhh no!", _context3.t0.response.data, "warning");
          console.error(_context3.t0);

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 20]]);
}

function convertTimeToMinuteAndHours(time) {
  try {
    var secondTime = time * 3600;
    var minuteTime = 0;
    var hourTime = 0;

    if (secondTime > 60) {
      minuteTime = parseInt(secondTime / 60);
      secondTime = parseInt(secondTime % 60);

      if (minuteTime > 60) {
        hourTime = parseInt(minuteTime / 60);
        minuteTime = parseInt(minuteTime % 60);
      }
    }

    if (minuteTime < 10) {
      result = "".concat(hourTime, ":0").concat(minuteTime);
    } else {
      result = "".concat(hourTime, ":").concat(minuteTime);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
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
  return regeneratorRuntime.async(function deleteProject$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(axios["delete"]("/projects/deleteProject/".concat(projectId)));

        case 3:
          renderProjects();
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
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

          throw new Error("There is a problem finding the modal in the HTML");

        case 3:
          modalEdit.style.display = "block";
          modalEdit.classList.add("showModal");
          formEdit = document.querySelector("#formEdit");

          if (formEdit) {
            _context5.next = 8;
            break;
          }

          throw new Error("There is a problem finding form from HTML");

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(axios.get("projects/findProject/".concat(uuidProject)));

        case 10:
          projectFound = _context5.sent;
          foundProject = projectFound.data.foundProject; //Set the client Name

          showClientNameInDOM(foundProject.clientId).then(function (data) {
            var html = "\n            <h3>Edit Project</h3>\n        <div>\n      \n        <input type=\"text\" name=\"projectName\" value=\"".concat(foundProject.projectName, "\" placeholder=\"Project name\" required>\n        </div>\n\n        <div>\n      \n        <select onclick=\"uploadClientNamesEdit()\" name=\"selectClientName\" id=\"selectClientNameEdit\">\n        <option id=\"option").concat(foundProject.clientId, "\" value=\"").concat(foundProject.clientId, "\" selected disabled hidden>").concat(data, "</option>    \n        </select>\n        </div>\n\n        <div>\n   \n        <select name=\"projectType\" id=\"projectType\">\n            <option value=\"").concat(foundProject.projectType, "\" selected disabled hidden>").concat(foundProject.projectType, "</option>\n            <option value=\"logo\">Logo</option>\n            <option value=\"graphicLanguage\">Graphic Language</option>\n            <option value=\"corporateWebsite\">Corporate Website</option>\n            <option value=\"landingPage\">Landing Page</option>\n            <option value=\"ecommerce\">Ecommerce</option>\n            <option value=\"branding\">Branding</option>\n            <option value=\"post\">Post</option>\n            <option value=\"packageDesign\">Package Design</option>\n            <option value=\"banner\">Banner</option>\n            <option value=\"rollUp\">Roll Up</option>\n            <option value=\"flyer\">Flyer</option>\n            <option value=\"digitalBook\">Digital Book</option>\n            <option value=\"newsLetter\">News Letter</option>\n            <option value=\"calendar\">Calendar</option>\n            <option value=\"businessCard\">Business Card</option>\n            <option value=\"presentation\">Presentation</option>\n            <option value=\"designedPage\">Designed Page</option>\n            <option value=\"all\">All</option>\n        </select>\n        </div>\n\n        <div>\n       \n        <select name=\"status\" id=\"status\">\n            <option value=\"").concat(foundProject.status, "\" selected disabled hidden>").concat(foundProject.status, "</option>\n            <option value=\"offerPending\">Offer Pending</option>\n            <option value=\"inProgress\">In Progress</option>\n            <option value=\"offerApproved\">Offer Approved</option>\n            <option value=\"stuck\">Stuck</option>\n            <option value=\"paidUp\">Paid Up</option>\n            <option value=\"waitingForSketchApproval\">Waiting for Sketch Approval</option>\n            <option value=\"postponed\">Postponed</option>\n            <option value=\"canceled\">Canceled</option>\n            <option value=\"finished\">Finished</option>\n        </select>\n        </div>\n\n        <div>\n     \n            <input type=\"number\" name=\"totalHours\" value=\"").concat(foundProject.totalHours, "\" placeholder=\"Total Hours for the project\">\n        </div>\n                     <input type=\"submit\" value=\"Update project\" class=\"button-form\" />\n        ");
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

          if (clientFound.data.foundClient) {
            _context6.next = 8;
            break;
          }

          clientFound = "No client assigned";
          return _context6.abrupt("return", clientFound);

        case 8:
          return _context6.abrupt("return", clientFound.data.foundClient.clientname);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
} //Handle Edit


function handleEdit(ev) {
  var _ev$target$elements2, projectName, clientId, projectType, status, totalHours, projectDetails;

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

          if (projectName) {
            _context7.next = 9;
            break;
          }

          throw new Error("You need to complete the project name");

        case 9:
          if (modalEdit) {
            _context7.next = 11;
            break;
          }

          throw new Error("There is a problem finding modalEdit from HTML");

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
          renderProjects();
          _context7.next = 23;
          break;

        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](0);
          swal("Ohhh no!", "".concat(_context7.t0), "warning");
          console.error(_context7.t0);

        case 23:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 19]]);
} //Function to get the names of the client in the "select Client Name"


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
          _clients = clientsInfo.data.infoClients;
          select = document.getElementById("selectClientNameEdit");

          for (index = 0; index < _clients.length; index++) {
            option = document.createElement("option");
            option.value = _clients[index].id;
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
} //Delete the information of the hours just for the "retailers" curstomers


function deleteInfoRetailer() {
  var clientsInfo, _clients2, projectsInfo, _loop2, index;

  return regeneratorRuntime.async(function deleteInfoRetailer$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;

          if (!(new Date().getDate() === 1)) {
            _context9.next = 13;
            break;
          }

          _context9.next = 4;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 4:
          clientsInfo = _context9.sent;
          _clients2 = clientsInfo.data.infoClients;
          _context9.next = 8;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllprojects"));

        case 8:
          projectsInfo = _context9.sent;
          projectsToShow = projectsInfo.data.infoProjects; //Add the information of the user to the project

          _loop2 = function _loop2(index) {
            var project = projectsToShow[index];

            _clients2.forEach(function (client) {
              if (client.id === project.clientId) {
                Object.assign(projectsToShow[index], client);
              }
            });
          };

          for (index = 0; index < projectsToShow.length; index++) {
            _loop2(index);
          }

          projectsToShow.forEach(function (element) {
            if (element.dealTime === "retainer") {
              restartInfoInProject(element);
            }
          });

        case 13:
          _context9.next = 18;
          break;

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 15]]);
}

function restartInfoInProject(element) {
  return regeneratorRuntime.async(function restartInfoInProject$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(axios.put("/projects/resetRetailerInfo/".concat(element.projectUuid)));

        case 3:
          _context10.next = 8;
          break;

        case 5:
          _context10.prev = 5;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0);

        case 8:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 5]]);
} //Search Projects


var searchSpecific = document.getElementById("search_specific");
searchSpecific.addEventListener("change", searchSpecificDay);

function searchSpecificDay(ev) {
  console.log(ev.target.value);
}