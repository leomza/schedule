"use strict";

//Cronometer
function init() {
  try {
    document.querySelector("#saveTime").addEventListener("click", saveTime);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML = "<div class=\"cronometer--number\">\n                                                    <p >00</p>\n                                                    <p >00</p>\n                                                    </div>";
  } catch (error) {
    console.error(error);
  }
} //To know what button I press and the id of the project


var eventTarget;
var idProject;
var typeOfButton;
var limitCallForTheClient;

function cronometer(event, projectId, typeActivity, limitPerDay) {
  return regeneratorRuntime.async(function cronometer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            eventTarget = event.target;
            idProject = projectId;
            typeOfButton = typeActivity;
            limitCallForTheClient = limitPerDay;
            disabledButtons(event);
            write();
            id = setInterval(write, 1000);
          } catch (error) {
            console.error(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function write() {
  var hAux, mAux, sAux, backColorsnumbers, _backColorsnumbers, _backColorsnumbers2;

  return regeneratorRuntime.async(function write$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          s++;

          if (s > 59) {
            m++;
            s = 0;
          }

          if (m > 59) {
            h++;
            m = 0;
          }

          if (h > 24) {
            h = 0;
          }

          if (s < 10) {
            sAux = "0" + s;
          } else {
            sAux = s;
          }

          if (m < 10) {
            mAux = "0" + m;
          } else {
            mAux = m;
          }

          if (h < 10) {
            hAux = "0" + h;
          } else {
            hAux = h;
          }

          if (m == limitCallForTheClient && s == 0 && typeOfButton === 'call') {
            backColorsnumbers = document.querySelector('.cronometer');
            backColorsnumbers.classList.add('alertRed');
            swal("Alert", "You have been in a call for more than 10 minutes", "warning");
          } else if (m == limitCallForTheClient && s == 0 && typeOfButton === 'recreation') {
            _backColorsnumbers = document.querySelector('.cronometer');

            _backColorsnumbers.classList.add('alertRed');

            swal("Alert", "You have been at rest for more than 30 minutes", "warning");
          } else if (m == limitCallForTheClient && s == 0 && typeOfButton === 'eat') {
            _backColorsnumbers2 = document.querySelector('.cronometer');

            _backColorsnumbers2.classList.add('alertRed');

            swal("Alert", "You have been eating for more than 45 minutes", "warning");
          } //Condition to send an email


          if (!(h == 1 && m == 0 && s == 0 && typeOfButton === 'call')) {
            _context2.next = 14;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(axios.post("/tasks/sendEmail/".concat(typeOfButton)));

        case 12:
          _context2.next = 17;
          break;

        case 14:
          if (!(h == 1 && m == 30 && s == 0 && typeOfButton === 'recreation' || typeOfButton === 'eat')) {
            _context2.next = 17;
            break;
          }

          _context2.next = 17;
          return regeneratorRuntime.awrap(axios.post("/tasks/sendEmail/".concat(typeOfButton)));

        case 17:
          document.getElementById("hms").innerHTML = "<div class=\"cronometer--number\">\n                                                    <p class=\"cronometer--number\">".concat(sAux, "</p>\n                                                    <p class=\"cronometer--number\">").concat(mAux, "</p>\n                                                    </div>");
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
}

function saveTime() {
  var userActivities, timeInHours, backColorsnumbers, message;
  return regeneratorRuntime.async(function saveTime$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userActivities = document.getElementsByName('activity');
          clearInterval(id);
          document.getElementById("hms").innerHTML = "<div class=\"cronometer--number\">\n        <p >00</p>\n        <p >00</p>\n        </div>";
          eventTarget.classList.remove('button__brightness');
          userActivities.forEach(function (activity) {
            activity.disabled = false;
            activity.classList.remove('button__disabled');
          });
          timeInHours = h + m / 60 + s / 60 / 60;
          timeInHours = parseFloat(timeInHours);
          backColorsnumbers = document.querySelector('.cronometer');
          backColorsnumbers.classList.remove('alertRed');

          if (!idProject) {
            _context3.next = 17;
            break;
          }

          _context3.next = 13;
          return regeneratorRuntime.awrap(axios.post("/projects/setTimeInProject/".concat(idProject, "/").concat(timeInHours, "/").concat(typeOfButton)));

        case 13:
          message = _context3.sent;
          _context3.next = 16;
          return regeneratorRuntime.awrap(axios.post("/clients/setTimeInClient/".concat(idProject, "/").concat(typeOfButton)));

        case 16:
          swal("".concat(message.data.message, "!")).then(function () {
            renderClients();
          });

        case 17:
          h = 0;
          m = 0;
          s = 0;
          _context3.next = 25;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

function disabledButtons(event) {
  try {
    var userActivities = document.getElementsByName('activity');
    userActivities.forEach(function (activity) {
      activity.disabled = true;
      activity.classList.add('button__disabled');
    });
    event.target.classList.add('button__brightness');
  } catch (error) {
    console.error(error);
  }
} //Render all the projects


function renderProjects() {
  var root, clientsInfo, clients, projectsInfo, _loop, index, html;

  return regeneratorRuntime.async(function renderProjects$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          root = document.querySelector('#root');

          if (root) {
            _context4.next = 4;
            break;
          }

          throw new Error('There is a problem finding the HTML to show the projects');

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 6:
          clientsInfo = _context4.sent;
          clients = clientsInfo.data.infoClients;
          _context4.next = 10;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllprojects"));

        case 10:
          projectsInfo = _context4.sent;
          projectsToShow = projectsInfo.data.infoProjects; //Add the information of the user to the project

          _loop = function _loop(index) {
            var project = projectsToShow[index];
            clients.forEach(function (client) {
              if (client.uuid === project.clientId) {
                Object.assign(projectsToShow[index], client);
              }
            });
          };

          for (index = 0; index < projectsToShow.length; index++) {
            _loop(index);
          }

          ;
          html = projectsToShow.map(function (element) {
            return "<div class=\"projects__list\" >\n                    <p> ".concat(element.projectName, " </p>\n                    \n                    <div class=\"projects__list__buttons\">\n\n                      <div class=\"projects__list__buttons__couple-one\">\n                        <button class=\"button__cronometer\" name=\"activity\" onclick=\"cronometer(event, '").concat(element.projectUuid, "', 'design', '").concat(element.callLimitPerDay, "')\"><img src=\"img/design.png\" alt=\"\"></button>\n                        <button class=\"button__cronometer\" name=\"activity\" onclick=\"cronometer(event, '").concat(element.projectUuid, "', 'call', '").concat(element.callLimitPerDay, "')\"><img src=\"img/Group 674.png\" alt=\"\"></button>\n                        </div>\n\n\n                        <div class=\"projects__list__buttons__couple-two\">\n                        <img src=\"img/task.png\" alt=\"\">\n                        <img src=\"img/calendar.png\" alt=\"\">\n                        </div>\n                    </div>\n                </div>\n                ");
          }).join('');
          root.innerHTML = html;
          _context4.next = 23;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);
          swal("Ohhh no!", _context4.t0.response.data, "warning");
          console.error(_context4.t0);

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 19]]);
}