"use strict";

//Cronometer
function init() {
  var buttonSaveTime, projectFound;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          document.querySelector("#saveTime").addEventListener("click", saveTime);
          _context.next = 4;
          return regeneratorRuntime.awrap(checkCronometer());

        case 4:
          if (!previousClock.data.foundTimer) {
            _context.next = 18;
            break;
          }

          h = previousClock.data.foundTimer.hours;
          m = previousClock.data.foundTimer.minutes;
          s = previousClock.data.foundTimer.seconds;
          document.getElementById("hms").innerHTML = "<div class=\"cronometer--number\">\n            <p >".concat(h, "</p>\n            <p >").concat(m, "</p>\n            </div>"); //Get the element to insert the text

          buttonSaveTime = document.getElementById('saveTime');
          _context.next = 12;
          return regeneratorRuntime.awrap(axios.get("projects/findProject/".concat(previousClock.data.foundTimer.idProject)));

        case 12:
          projectFound = _context.sent;
          nameOfTheProject = projectFound.data.foundProject.projectName;
          buttonSaveTime.innerHTML = "<p> ".concat(nameOfTheProject, " </p>");
          write(event, previousClock.data.foundTimer.idProject, previousClock.data.foundTimer.typeOfButton, 999);
          _context.next = 22;
          break;

        case 18:
          h = 0;
          m = 0;
          s = 0;
          document.getElementById("hms").innerHTML = "<div class=\"cronometer--number\">\n                                                        <p >00</p>\n                                                        <p >00</p>\n                                                        </div>";

        case 22:
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24]]);
} //To know what button I press and the id of the project


var eventTarget;
var idProject;
var typeOfButton;
var limitCallForTheClient;
var generalCallTime;
var generalRecreationTime;
var generalEatTime; //Get the email of the user from the localStorage to save the time second by second

var userEmail = JSON.parse(localStorage.getItem('userInformation')); //This variable is going to contain all the information when I load the page for the first time and I already have information in the clock

var previousClock;

function cronometer(event, projectId, typeActivity, limitPerDay) {
  var generalTime, infoSettings;
  return regeneratorRuntime.async(function cronometer$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          eventTarget = event.target;
          idProject = projectId;
          typeOfButton = typeActivity;

          if (!(limitPerDay === 'general')) {
            _context2.next = 21;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(axios.get("settings/getGeneralTimeInformation"));

        case 7:
          generalTime = _context2.sent;
          infoSettings = generalTime.data.infoSettings;
          _context2.t0 = typeOfButton;
          _context2.next = _context2.t0 === 'call' ? 12 : _context2.t0 === 'recreation' ? 15 : _context2.t0 === 'eat' ? 18 : 21;
          break;

        case 12:
          limitPerDay = infoSettings[0].generalTimeCall;
          generalCallTime = infoSettings[0].generalTimeCall;
          return _context2.abrupt("break", 21);

        case 15:
          limitPerDay = infoSettings[0].generalTimeRecreation;
          generalRecreationTime = infoSettings[0].generalTimeRecreation;
          return _context2.abrupt("break", 21);

        case 18:
          limitPerDay = infoSettings[0].generalTimeEat;
          generalEatTime = infoSettings[0].generalTimeEat;
          return _context2.abrupt("break", 21);

        case 21:
          limitCallForTheClient = limitPerDay;
          setTextHTMLSaveTime(eventTarget, idProject);
          disabledButtons(event);
          write();
          id = setInterval(write, 100);
          _context2.next = 31;
          break;

        case 28:
          _context2.prev = 28;
          _context2.t1 = _context2["catch"](0);
          console.error(_context2.t1);

        case 31:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 28]]);
}

function write() {
  var hAux, mAux, sAux, backColorsnumbers, _backColorsnumbers, _backColorsnumbers2, timeInHours, information;

  return regeneratorRuntime.async(function write$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
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

          if ((m == generalCallTime || m == limitCallForTheClient) && s == 0 && typeOfButton === 'call') {
            backColorsnumbers = document.querySelector('.cronometer');
            backColorsnumbers.classList.add('alertRed');
            limitCallForTheClient ? swal("Alert", "You have been in a call for more than ".concat(limitCallForTheClient, " minutes"), "warning") : swal("Alert", "You have been in a call for more than ".concat(generalCallTime, " minutes"), "warning");
          } else if (m == generalRecreationTime && s == 0 && typeOfButton === 'recreation') {
            _backColorsnumbers = document.querySelector('.cronometer');

            _backColorsnumbers.classList.add('alertRed');

            swal("Alert", "You have been at rest for more than ".concat(generalRecreationTime, " minutes"), "warning");
          } else if (m == generalEatTime && s == 0 && typeOfButton === 'eat') {
            _backColorsnumbers2 = document.querySelector('.cronometer');

            _backColorsnumbers2.classList.add('alertRed');

            swal("Alert", "You have been eating for more than ".concat(generalEatTime, " minutes"), "warning");
          }
          /*         //Condition to send an email
                  if (h == 1 && m == 0 && s == 0 && typeOfButton === 'call') {
                      await axios.post(`/tasks/sendEmail/${typeOfButton}`);
          
                  } else if (h == 1 && m == 30 && s == 0 && (typeOfButton === 'recreation' || typeOfButton === 'eat')) {
                      await axios.post(`/tasks/sendEmail/${typeOfButton}`);
                  } */
          //Save the time in the server second by second for the user that is logged in


          timeInHours = [h, m, s];
          information = {
            idProject: idProject,
            typeOfButton: typeOfButton,
            userEmail: userEmail,
            timeInHours: timeInHours
          };
          _context3.next = 13;
          return regeneratorRuntime.awrap(axios.post("/users/saveTime", information));

        case 13:
          document.getElementById("hms").innerHTML = "<div class=\"cronometer--number\">\n                                                        <p class=\"cronometer--number\">".concat(mAux, "</p>\n                                                        <p class=\"cronometer--number\">").concat(hAux, "</p>\n                                                    </div>");
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

function saveTime() {
  var userActivities, timeInHours, backColorsnumbers, message, _message, buttonSaveTime;

  return regeneratorRuntime.async(function saveTime$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userActivities = document.getElementsByName('activity');
          clearInterval(id);
          document.getElementById("hms").innerHTML = "<div class=\"cronometer--number\">\n        <p >00</p>\n        <p >00</p>\n        </div>";

          if (!previousClock.data.foundTimer) {
            eventTarget.classList.remove('button__brightness');
            userActivities.forEach(function (activity) {
              activity.disabled = false;
              activity.classList.remove('button__disabled');
            });
          }

          timeInHours = h + m / 60 + s / 60 / 60;
          timeInHours = parseFloat(timeInHours);
          backColorsnumbers = document.querySelector('.cronometer');
          backColorsnumbers.classList.remove('alertRed');

          if (!idProject) {
            _context4.next = 18;
            break;
          }

          _context4.next = 12;
          return regeneratorRuntime.awrap(axios.post("/projects/setTimeInProject/".concat(idProject, "/").concat(timeInHours, "/").concat(typeOfButton)));

        case 12:
          message = _context4.sent;
          _context4.next = 15;
          return regeneratorRuntime.awrap(axios.post("/clients/setTimeInClient/".concat(idProject, "/").concat(typeOfButton)));

        case 15:
          swal("".concat(message.data.message, "!")).then(function () {
            location.reload();
          });
          _context4.next = 22;
          break;

        case 18:
          _context4.next = 20;
          return regeneratorRuntime.awrap(axios.post("/projects/setTimeInProject/e62aea63-9e38-463f-a4fa-13eb982b9ddc/".concat(timeInHours, "/").concat(typeOfButton)));

        case 20:
          _message = _context4.sent;
          swal("".concat(_message.data.message, "!")).then(function () {
            location.reload();
          });

        case 22:
          if (!previousClock) {
            _context4.next = 25;
            break;
          }

          _context4.next = 25;
          return regeneratorRuntime.awrap(axios["delete"]("/users/previousClock/".concat(userEmail)));

        case 25:
          buttonSaveTime = document.getElementById('saveTime');
          buttonSaveTime.innerHTML = '';
          h = 0;
          m = 0;
          s = 0;
          _context4.next = 35;
          break;

        case 32:
          _context4.prev = 32;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 35:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 32]]);
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
  var root, clientsInfo, clients, projectsInfo, _loop, index, projectsToShowSorted, html;

  return regeneratorRuntime.async(function renderProjects$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          root = document.querySelector('#root');

          if (root) {
            _context5.next = 4;
            break;
          }

          throw new Error('There is a problem finding the HTML to show the projects');

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 6:
          clientsInfo = _context5.sent;
          clients = clientsInfo.data.infoClients;
          _context5.next = 10;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllprojects"));

        case 10:
          projectsInfo = _context5.sent;
          projectsToShow = projectsInfo.data.infoProjects; //Add the information of the user to the project

          _loop = function _loop(index) {
            var project = projectsToShow[index];
            clients.forEach(function (client) {
              if (client.id === project.clientId) {
                Object.assign(projectsToShow[index], client);
              }
            });
          };

          for (index = 0; index < projectsToShow.length; index++) {
            _loop(index);
          }

          ;
          projectsToShowSorted = projectsToShow.sort(function (a, b) {
            return a.projectName.localeCompare(b.projectName);
          });
          html = projectsToShowSorted.map(function (element) {
            return "<div class=\"projects__list\" >\n                    <p> ".concat(element.projectName, " </p>\n                    <p> ").concat(element.clientname, " </p>\n\n                    \n                    <div class=\"projects__list__buttons\">\n\n                      <div class=\"projects__list__buttons__couple-one\">\n                        <button class=\"button__cronometer\" name=\"activity\" onclick=\"cronometer(event, '").concat(element.projectUuid, "', 'design', '").concat(element.callLimitPerDay, "')\"><img src=\"img/design.png\" alt=\"\"></button>\n                        <button class=\"button__cronometer\" name=\"activity\" onclick=\"cronometer(event, '").concat(element.projectUuid, "', 'call', '").concat(element.callLimitPerDay, "')\"><img src=\"img/Group 674.png\" alt=\"\"></button>\n                        </div>\n\n                    </div>\n                </div>\n                ");
          }).join('');
          root.innerHTML = html;
          _context5.next = 24;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);
          swal("Ohhh no!", _context5.t0.response.data, "warning");
          console.error(_context5.t0);

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 20]]);
} //Function to set in the HTML a custom buttom to save the time


function setTextHTMLSaveTime(eventTarget, idProject) {
  var buttonSaveTime, _nameOfTheProject, projectFound;

  return regeneratorRuntime.async(function setTextHTMLSaveTime$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          //Get the element to insert the text
          buttonSaveTime = document.getElementById('saveTime');

          if (!idProject) {
            _context6.next = 9;
            break;
          }

          _context6.next = 5;
          return regeneratorRuntime.awrap(axios.get("projects/findProject/".concat(idProject)));

        case 5:
          projectFound = _context6.sent;
          _nameOfTheProject = projectFound.data.foundProject.projectName;
          _context6.next = 10;
          break;

        case 9:
          _nameOfTheProject = 'General';

        case 10:
          buttonSaveTime.innerHTML = "<img src=\"".concat(eventTarget.attributes.src.nodeValue, "\" alt=\"\" />\n                                    <p> ").concat(_nameOfTheProject, " </p>");
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

; //When the page load for first time is going to check the cronometer:

function checkCronometer() {
  var timeData;
  return regeneratorRuntime.async(function checkCronometer$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(axios.get("users/checkTime/".concat(userEmail)));

        case 3:
          timeData = _context7.sent;

          if (timeData) {
            previousClock = timeData;
          }

          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
}