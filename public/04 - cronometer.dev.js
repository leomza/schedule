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
var generalCallTime;
var generalRecreationTime;
var generalEatTime;

function cronometer(event, projectId, typeActivity, limitPerDay) {
  var generalTime, infoSettings;
  return regeneratorRuntime.async(function cronometer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          eventTarget = event.target;
          idProject = projectId;
          typeOfButton = typeActivity;

          if (!(limitPerDay === 'general')) {
            _context.next = 21;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(axios.get("settings/getGeneralTimeInformation"));

        case 7:
          generalTime = _context.sent;
          infoSettings = generalTime.data.infoSettings;
          _context.t0 = typeOfButton;
          _context.next = _context.t0 === 'call' ? 12 : _context.t0 === 'recreation' ? 15 : _context.t0 === 'eat' ? 18 : 21;
          break;

        case 12:
          limitPerDay = infoSettings[0].generalTimeCall;
          generalCallTime = infoSettings[0].generalTimeCall;
          return _context.abrupt("break", 21);

        case 15:
          limitPerDay = infoSettings[0].generalTimeRecreation;
          generalRecreationTime = infoSettings[0].generalTimeRecreation;
          return _context.abrupt("break", 21);

        case 18:
          limitPerDay = infoSettings[0].generalTimeEat;
          generalEatTime = infoSettings[0].generalTimeEat;
          return _context.abrupt("break", 21);

        case 21:
          limitCallForTheClient = limitPerDay;
          setTextHTMLSaveTime(eventTarget, idProject);
          disabledButtons(event);
          write();
          id = setInterval(write, 1000);
          _context.next = 31;
          break;

        case 28:
          _context.prev = 28;
          _context.t1 = _context["catch"](0);
          console.error(_context.t1);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 28]]);
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
          if (!(h == 1 && m == 30 && s == 0 && (typeOfButton === 'recreation' || typeOfButton === 'eat'))) {
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
  var userActivities, timeInHours, backColorsnumbers, message, _message, buttonSaveTime;

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
            _context3.next = 19;
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
            location.reload();
          });
          _context3.next = 24;
          break;

        case 19:
          console.log(typeOfButton);
          _context3.next = 22;
          return regeneratorRuntime.awrap(axios.post("/projects/setTimeInProject/461ace80-d817-484c-83ac-395871e95478/".concat(timeInHours, "/").concat(typeOfButton)));

        case 22:
          _message = _context3.sent;
          swal("".concat(_message.data.message, "!")).then(function () {
            location.reload();
          });

        case 24:
          buttonSaveTime = document.getElementById('saveTime');
          buttonSaveTime.innerHTML = '';
          h = 0;
          m = 0;
          s = 0;
          _context3.next = 34;
          break;

        case 31:
          _context3.prev = 31;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 34:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 31]]);
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
              if (client.id === project.clientId) {
                Object.assign(projectsToShow[index], client);
              }
            });
          };

          for (index = 0; index < projectsToShow.length; index++) {
            _loop(index);
          }

          ;
          html = projectsToShow.map(function (element) {
            return "<div class=\"projects__list\" >\n                    <p> ".concat(element.projectName, " </p>\n                    <p> ").concat(element.clientname, " </p>\n\n                    \n                    <div class=\"projects__list__buttons\">\n\n                      <div class=\"projects__list__buttons__couple-one\">\n                        <button class=\"button__cronometer\" name=\"activity\" onclick=\"cronometer(event, '").concat(element.projectUuid, "', 'design', '").concat(element.callLimitPerDay, "')\"><img src=\"img/design.png\" alt=\"\"></button>\n                        <button class=\"button__cronometer\" name=\"activity\" onclick=\"cronometer(event, '").concat(element.projectUuid, "', 'call', '").concat(element.callLimitPerDay, "')\"><img src=\"img/Group 674.png\" alt=\"\"></button>\n                        </div>\n\n                    </div>\n                </div>\n                ");
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
} //Function to set in the HTML a custom buttom to save the time


function setTextHTMLSaveTime(eventTarget, idProject) {
  var buttonSaveTime, nameOfTheProject, projectFound;
  return regeneratorRuntime.async(function setTextHTMLSaveTime$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          //Get the element to insert the text
          buttonSaveTime = document.getElementById('saveTime');

          if (!idProject) {
            _context5.next = 9;
            break;
          }

          _context5.next = 5;
          return regeneratorRuntime.awrap(axios.get("projects/findProject/".concat(idProject)));

        case 5:
          projectFound = _context5.sent;
          nameOfTheProject = projectFound.data.foundProject.projectName;
          _context5.next = 10;
          break;

        case 9:
          nameOfTheProject = 'General';

        case 10:
          buttonSaveTime.innerHTML = "<img src=\"".concat(eventTarget.attributes.src.nodeValue, "\" alt=\"\" />\n                                    <p> ").concat(nameOfTheProject, " </p>");
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

;