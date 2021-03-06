"use strict";

//Handle the form to create a new Task:
var handleForm = document.querySelector("#formCreate");
handleForm.addEventListener("submit", handleNewTask);

function handleNewTask(ev) {
  var _ev$target$elements, taskName, description, limitDate, projectId, statusTask, flag, taskDetails, tasksCreated, uuid, idProject;

  return regeneratorRuntime.async(function handleNewTask$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ev.preventDefault();
          _ev$target$elements = ev.target.elements, taskName = _ev$target$elements.taskName, description = _ev$target$elements.description, limitDate = _ev$target$elements.limitDate, projectId = _ev$target$elements.projectId, statusTask = _ev$target$elements.statusTask, flag = _ev$target$elements.flag;
          taskName = taskName.value;
          description = description.value;
          limitDate = limitDate.value;
          projectId = selectProjectName.value;
          statusTask = statusTask.value;
          flag = flag.value;
          modalCreate.style.display = "none";
          ev.target.reset();
          taskDetails = {
            taskName: taskName,
            description: description,
            limitDate: limitDate,
            projectId: projectId,
            statusTask: statusTask,
            flag: flag
          };
          _context.next = 14;
          return regeneratorRuntime.awrap(axios.post("/tasks/newTask", taskDetails));

        case 14:
          tasksCreated = _context.sent;
          //Push the task to the project
          uuid = tasksCreated.data.task.uuid;
          idProject = tasksCreated.data.task.projectId;
          _context.next = 19;
          return regeneratorRuntime.awrap(axios.post("/projects/addTask", {
            uuid: uuid,
            idProject: idProject
          }));

        case 19:
          swal("Good job!", "New task added succesfully!", "success");
          renderTasks();
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
} //Function to get the names of the projects in the "select Project Name"


function uploadProjectNames() {
  var projectsInfo, projects, select, index, option;
  return regeneratorRuntime.async(function uploadProjectNames$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllProjects"));

        case 3:
          projectsInfo = _context2.sent;
          projects = projectsInfo.data.infoProjects;
          select = document.getElementById("selectProjectName");

          for (index = 0; index < projects.length; index++) {
            option = document.createElement("option");
            option.value = projects[index].projectUuid;
            option.innerHTML = projects[index].projectName;
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
} //Render all the tasks


function renderTasks(tasksToShow) {
  var taskToday, taskTomorrow, taskGeneral, projectsInfo, projects, tasksInfo, _loop, index, todayDay, tomorrowDay, htmlToday, htmlTommorow, sortTasksToShow, htmlGeneral;

  return regeneratorRuntime.async(function renderTasks$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          taskToday = document.querySelector("#taskToday");

          if (taskToday) {
            _context3.next = 4;
            break;
          }

          throw new Error("There is a problem finding the HTML element to put the data");

        case 4:
          taskTomorrow = document.querySelector("#taskTomorrow");

          if (taskTomorrow) {
            _context3.next = 7;
            break;
          }

          throw new Error("There is a problem finding the HTML element to put the data");

        case 7:
          taskGeneral = document.querySelector("#taskGeneral");

          if (taskGeneral) {
            _context3.next = 10;
            break;
          }

          throw new Error("There is a problem finding the HTML element to put the data");

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllProjects"));

        case 12:
          projectsInfo = _context3.sent;
          projects = projectsInfo.data.infoProjects;

          if (tasksToShow) {
            _context3.next = 19;
            break;
          }

          _context3.next = 17;
          return regeneratorRuntime.awrap(axios.get("/tasks/getAlltasks"));

        case 17:
          tasksInfo = _context3.sent;
          tasksToShow = tasksInfo.data.infoTasks;

        case 19:
          _loop = function _loop(index) {
            var task = tasksToShow[index];
            projects.forEach(function (project) {
              if (project.projectUuid === task.projectId) {
                Object.assign(tasksToShow[index], project);
              }
            });
          };

          //Add the information of the project to the task
          for (index = 0; index < tasksToShow.length; index++) {
            _loop(index);
          } //Set the today date


          todayDay = setTodayDay();
          tomorrowDay = setTomorrowDay();
          htmlToday = tasksToShow.map(function (element) {
            if (element.limitDate === todayDay) {
              var limitDate = formatDate(element.limitDate);

              limitStrLength = function limitStrLength(text, max_length) {
                if (text.length > max_length - 3) {
                  return text.substring(0, max_length).trimEnd() + "...";
                } else {
                  return text;
                }
              };

              var taskName = element.taskName;
              var changeOval = element.statusTask === "starting" ? "./img/Oval 8.png" : element.statusTask === "characterization" ? "./img/Oval 9.png" : element.statusTask === "design" ? "./img/Oval 10.png" : element.statusTask === "repairs" ? "./img/Oval 16.png" : element.statusTask === "toSend" ? "./img/Oval 12.png" : element.statusTask === "waiting" ? "./img/Oval 13.png" : element.statusTask === "stuck" ? "./img/Oval 14.png" : element.statusTask === "freeText" ? "./img/Oval 15.png" : null;
              return " <div class=\"task\">\n                        <div class=\"task-titles\" onclick='showModalDescription(\"".concat(element.taskName, "\", \"").concat(element.limitDate, "\", \"").concat(element.description, "\")'>\n                        <div class=\"task-titles__container\">\n                            <div class=\"task-titles__container__oval\">\n                            <img src=\"").concat(changeOval, "\" alt=\"\">\n                            </div>\n                            <div class=\"task-titles__container__content\">\n                                <div class=\"task-titles__container__content__taskName\">\n                                <h5>").concat(limitStrLength(taskName, 15), "</h5>\n                                </div>\n                                <div class=\"task-titles__container__content__projectName\">\n                                <p>").concat(element.projectName, "</p>\n                                </div>\n                            </div>\n\n                           \n                        </div>\n                        </div>\n                        <div class=\"task-date\">\n                            <p>").concat(limitDate, "</p>\n                            <img src=\"./img/edit.png\" alt=\"\" onclick='editTask(\"").concat(element.uuid, "\")' title=\"Edit\"> \n                            <img src=\"./img/delete.png\" alt=\"\" onclick='removeTask(\"").concat(element.uuid, "\", \"").concat(element.taskName, "\", \"").concat(element.projectId, "\")' title=\"Remove\"> \n                        </div>\n                    </div>");
            }
          }).join("");
          taskToday.innerHTML = htmlToday;
          htmlTommorow = tasksToShow.map(function (element) {
            if (element.limitDate === tomorrowDay) {
              var limitDate = formatDate(element.limitDate);

              limitStrLength = function limitStrLength(text, max_length) {
                if (text.length > max_length - 3) {
                  return text.substring(0, max_length).trimEnd() + "...";
                } else {
                  return text;
                }
              };

              var taskName = element.taskName;
              var changeOval = element.statusTask === "starting" ? "./img/Oval 8.png" : element.statusTask === "characterization" ? "./img/Oval 9.png" : element.statusTask === "design" ? "./img/Oval 10.png" : element.statusTask === "repairs" ? "./img/Oval 16.png" : element.statusTask === "toSend" ? "./img/Oval 12.png" : element.statusTask === "waiting" ? "./img/Oval 13.png" : element.statusTask === "stuck" ? "./img/Oval 14.png" : element.statusTask === "freeText" ? "./img/Oval 15.png" : null;
              return " <div class=\"task\">\n                    <div class=\"task-titles\" onclick='showModalDescription(\"".concat(element.taskName, "\", \"").concat(element.limitDate, "\", \"").concat(element.description, "\")'>\n                    <div class=\"task-titles__container\">\n                        <div class=\"task-titles__container__oval\">\n                        <img src=\"").concat(changeOval, "\" alt=\"\">\n                        </div>\n                        <div class=\"task-titles__container__content\">\n                            <div class=\"task-titles__container__content__taskName\">\n                            <h5>").concat(limitStrLength(taskName, 15), "</h5>\n                            </div>\n                            <div class=\"task-titles__container__content__projectName\">\n                            <p>").concat(element.projectName, "</p>\n                            </div>\n                        </div>\n\n                       \n                    </div>\n                    </div>\n                    <div class=\"task-date\">\n                        <p>").concat(limitDate, "</p>\n                        <img src=\"./img/edit.png\" alt=\"\" onclick='editTask(\"").concat(element.uuid, "\")' title=\"Edit\"> \n                        <img src=\"./img/delete.png\" alt=\"\" onclick='removeTask(\"").concat(element.uuid, "\", \"").concat(element.taskName, "\", \"").concat(element.projectId, "\")' title=\"Remove\"> \n                    </div>\n                </div>");
            }
          }).join("");
          taskTomorrow.innerHTML = htmlTommorow; //This is to sort the tasks by date

          sortTasksToShow = tasksToShow.sort(function (a, b) {
            a = a.limitDate.split("/").reverse().join("");
            b = b.limitDate.split("/").reverse().join("");
            return a.localeCompare(b);
          });
          htmlGeneral = sortTasksToShow.map(function (element) {
            if (element.limitDate !== todayDay && element.limitDate !== tomorrowDay) {
              var limitDate = formatDate(element.limitDate);

              limitStrLength = function limitStrLength(text, max_length) {
                if (text.length > max_length - 3) {
                  return text.substring(0, max_length).trimEnd() + "...";
                } else {
                  return text;
                }
              };

              var taskName = element.taskName;
              var changeOval = element.statusTask === "starting" ? "./img/Oval 8.png" : element.statusTask === "characterization" ? "./img/Oval 9.png" : element.statusTask === "design" ? "./img/Oval 10.png" : element.statusTask === "repairs" ? "./img/Oval 16.png" : element.statusTask === "toSend" ? "./img/Oval 12.png" : element.statusTask === "waiting" ? "./img/Oval 13.png" : element.statusTask === "stuck" ? "./img/Oval 14.png" : element.statusTask === "freeText" ? "./img/Oval 15.png" : null;
              return " <div class=\"task\">\n                    <div class=\"task-titles\" onclick='showModalDescription(\"".concat(element.taskName, "\", \"").concat(element.limitDate, "\", \"").concat(element.description, "\")'>\n                    <div class=\"task-titles__container\">\n                        <div class=\"task-titles__container__oval\">\n                            <img src=\"").concat(changeOval, "\" alt=\"\">\n                        </div>\n                        <div class=\"task-titles__container__content\">\n                            <div class=\"task-titles__container__content__taskName\">\n                            <h5>").concat(limitStrLength(taskName, 15), "</h5>\n                            </div>\n                            <div class=\"task-titles__container__content__projectName\">\n                            <p>").concat(element.projectName, "</p>\n                            </div>\n                        </div>\n\n                       \n                    </div>\n                    </div>\n                    <div class=\"task-date\">\n                        <p>").concat(limitDate, "</p>\n                        <img src=\"./img/edit.png\" alt=\"\" onclick='editTask(\"").concat(element.uuid, "\")' title=\"Edit\"> \n                        <img src=\"./img/delete.png\" alt=\"\" onclick='removeTask(\"").concat(element.uuid, "\", \"").concat(element.taskName, "\", \"").concat(element.projectId, "\")' title=\"Remove\"> \n                    </div>\n                </div>");
            }
          }).join("");
          taskGeneral.innerHTML = htmlGeneral;
          _context3.next = 36;
          break;

        case 32:
          _context3.prev = 32;
          _context3.t0 = _context3["catch"](0);
          swal("Ohhh no!", _context3.t0.response.data, "warning");
          console.error(_context3.t0);

        case 36:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 32]]);
} //Set the day of today


function setTodayDay() {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  } catch (error) {
    console.error(error);
  }
} //Set the day of tomorrow


function setTomorrowDay() {
  try {
    var today = new Date();
    var dd = String(today.getDate() + 1).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

    var yyyy = today.getFullYear();
    tomorrow = yyyy + "-" + mm + "-" + dd;
    return tomorrow;
  } catch (error) {
    console.error(error);
  }
} //Delete a tasks


function removeTask(taskId, taskName, projectId) {
  try {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task ".concat(taskName, "!"),
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(function (willDelete) {
      if (willDelete) {
        deleteTask(taskId, projectId);
      } else {
        swal("Your task is safe!");
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function deleteTask(taskId, projectId) {
  return regeneratorRuntime.async(function deleteTask$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(axios["delete"]("/tasks/deleteTask/".concat(taskId, "/").concat(projectId)));

        case 3:
          renderTasks();
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
} //Update a task:
//This will contain the Task Id to Edit


var taskIdEdit;

function editTask(idTask) {
  var formEdit, taskFound, foundTask;
  return regeneratorRuntime.async(function editTask$(_context5) {
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
          return regeneratorRuntime.awrap(axios.get("tasks/findTask/".concat(idTask)));

        case 10:
          taskFound = _context5.sent;
          foundTask = taskFound.data.foundTask; //Set the Project Name

          showProjectNameInDOM(foundTask.projectId).then(function (data) {
            var html = "\n            <h3>Edit the task</h3>\n            <div>\n                 \n                <input type=\"text\" name=\"taskName\" placeholder=\"Task Name\" value=\"".concat(foundTask.taskName, "\" required>\n            </div>\n\n            <div>\n              \n                <input type=\"text\" name=\"description\" placeholder=\"Description\" value=\"").concat(foundTask.description, "\" required>\n            </div>\n\n            <div>\n   \n                <select onclick=\"uploadProjectNamesEdit()\" name=\"projectId\" id=\"selectProjectNameEdit\">\n                    <option id=\"option").concat(foundTask.projectId, "\" value=\"").concat(foundTask.projectId, "\" selected disabled hidden>").concat(data, "</option>\n                </select>\n            </div>\n\n            <div> \n                <input type=\"date\" name=\"limitDate\" value=\"").concat(foundTask.limitDate, "\" required>\n            </div>\n\n            <div>\n            <select name=\"statusTask\" id=\"statusTask\">\n                <option value=\"").concat(foundTask.statusTask, "\" selected disabled hidden>").concat(foundTask.statusTask, "</option>\n                <option value=\"starting\">Starting</option>\n                <option value=\"characterization\">Characterization</option>\n                <option value=\"design\">Design</option>\n                <option value=\"repairs\">Repairs</option>\n                <option value=\"toSend\">To send</option>\n                <option value=\"waiting\">Waiting</option>\n                <option value=\"stuck\">Stuck</option>\n                <option value=\"freeText \">Free text </option>\n            </select>\n          </div>\n\n          <div>\n            <select name=\"flag\" id=\"flag\">\n              <option value=\"").concat(foundTask.flag, "\" selected disabled hidden>").concat(foundTask.flag, "</option>\n              <option value=\"now\">Now</option>\n              <option value=\"urgent\">Urgent</option>\n              <option value=\"needChat\">Need to chat before</option>\n              <option value=\"fastImprovement\">Fast improvement</option>\n            </select>\n          </div>\n\n            <input type=\"submit\" value=\"Update task\"class=\"button-form\">\n        ");
            formEdit.innerHTML = html;
            taskIdEdit = foundTask.uuid;
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
} //Function to show the project name in the Edit DOM


function showProjectNameInDOM(projectId) {
  var projectFound;
  return regeneratorRuntime.async(function showProjectNameInDOM$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(axios.get("projects/findProject/".concat(projectId)));

        case 2:
          projectFound = _context6.sent;
          return _context6.abrupt("return", projectFound.data.foundProject.projectName);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
} //Handle Edit


function handleEdit(ev) {
  var _ev$target$elements2, taskName, description, projectId, limitDate, statusTask, flag, tasksDetails, allTasks;

  return regeneratorRuntime.async(function handleEdit$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _ev$target$elements2 = ev.target.elements, taskName = _ev$target$elements2.taskName, description = _ev$target$elements2.description, projectId = _ev$target$elements2.projectId, limitDate = _ev$target$elements2.limitDate, statusTask = _ev$target$elements2.statusTask, flag = _ev$target$elements2.flag;
          taskName = taskName.value;
          description = description.value;
          projectId = projectId.value;
          limitDate = limitDate.value;
          statusTask = statusTask.value;
          flag = flag.value;

          if (!(!taskName || !description || !limitDate || !projectId)) {
            _context7.next = 10;
            break;
          }

          throw new Error("You need to complete all the fields");

        case 10:
          if (modalEdit) {
            _context7.next = 12;
            break;
          }

          throw new Error("There is a problem finding modalEdit from HTML");

        case 12:
          modalEdit.style.display = "none";
          tasksDetails = {
            taskName: taskName,
            description: description,
            projectId: projectId,
            limitDate: limitDate,
            statusTask: statusTask,
            flag: flag
          };
          _context7.next = 16;
          return regeneratorRuntime.awrap(axios.put("/tasks/editTask/".concat(taskIdEdit), tasksDetails));

        case 16:
          allTasks = _context7.sent;
          ev.target.reset();
          renderTasks(allTasks);
          _context7.next = 25;
          break;

        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](0);
          swal("Ohhh no!", "".concat(_context7.t0), "warning");
          console.error(_context7.t0);

        case 25:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 21]]);
} //Function to get the names of the project in the "select Project Name"


function uploadProjectNamesEdit() {
  var projectsInfo, _projects, select, index, option;

  return regeneratorRuntime.async(function uploadProjectNamesEdit$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllProjects"));

        case 3:
          projectsInfo = _context8.sent;
          _projects = projectsInfo.data.infoProjects;
          select = document.getElementById("selectProjectNameEdit");

          for (index = 0; index < _projects.length; index++) {
            option = document.createElement("option");
            option.value = _projects[index].projectUuid;
            option.innerHTML = _projects[index].projectName;
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
} //Function to do a filter in the search input


function handleSearch() {
  var searchTask, regEx, searching, tasksInfo, tasks, tasksFiltered;
  return regeneratorRuntime.async(function handleSearch$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          searchTask = document.querySelector("#search");
          regEx = searchTask.value;
          searching = new RegExp(regEx, "i");
          _context9.next = 6;
          return regeneratorRuntime.awrap(axios.get("/tasks/getAllTasks"));

        case 6:
          tasksInfo = _context9.sent;
          tasks = tasksInfo.data.infoTasks;
          tasksFiltered = tasks.filter(function (task) {
            return searching.test(task.taskName);
          });
          renderTasks(tasksFiltered);
          _context9.next = 15;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function showModalDescription(taskName, limitDate, description) {
  try {
    if (!modalDescription) throw new Error("There is a problem finding the modal in the HTML");
    modalDescription.style.display = "block";
    modalDescription.classList.add("showModal");
    var taskDescriptionInfo = document.querySelector("#showTaskDescriptionInfo");
    if (!taskDescriptionInfo) throw new Error("There is a problem finding modal from HTML");
    limitDate = moment(limitDate).format("DD/MM/YYYY");
    var html = "\n        <div class=\"content\">\n        <div class=\"content__name\"><h4> ".concat(taskName, "</h4></div>\n        <div class=\"content__date\"><span> ").concat(limitDate, "</span></div>\n        <div class=\"content__description\"><p>").concat(description, "</p></div>\n        </div>");
    taskDescriptionInfo.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}