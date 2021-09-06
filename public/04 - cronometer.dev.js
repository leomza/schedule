"use strict";

//Cronometer
function init() {
  try {
    document.querySelector("#saveTime").addEventListener("click", saveTime);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML = "<p class=\"cronometer--number\">00</p>\n                                                    <p class=\"cronometer--number\">00</p>";
  } catch (error) {
    console.error(error);
  }
} //To know what button I press and the id of the project


var eventTarget;
var idProject;
var typeOfButton;

function cronometer(event, projectId, typeActivity) {
  try {
    eventTarget = event.target;
    idProject = projectId;
    typeOfButton = typeActivity;
    disabledButtons(event);
    write();
    id = setInterval(write, 1000);
  } catch (error) {
    console.error(error);
  }
}

function write() {
  try {
    var hAux, mAux, sAux;
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

    document.getElementById("hms").innerHTML = "<p class=\"cronometer--number\">".concat(sAux, "</p>\n                                                    <p class=\"cronometer--number\">").concat(mAux, "</p>");
  } catch (error) {
    console.error(error);
  }
}

function saveTime() {
  var userActivities, timeInHours, message;
  return regeneratorRuntime.async(function saveTime$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userActivities = document.getElementsByName('activity');
          clearInterval(id);
          document.getElementById("hms").innerHTML = "<p class=\"cronometer--number\">00</p>\n                                                    <p class=\"cronometer--number\">00</p>";
          eventTarget.classList.remove('button__brightness');
          userActivities.forEach(function (activity) {
            activity.disabled = false;
            activity.classList.remove('button__disabled');
          });
          timeInHours = h + m / 60 + s / 60 / 60;
          timeInHours = parseFloat(timeInHours);

          if (!idProject) {
            _context.next = 15;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(axios.post("/projects/setTimeInProject/".concat(idProject, "/").concat(timeInHours, "/").concat(typeOfButton)));

        case 11:
          message = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(axios.post("/clients/setTimeInClient/".concat(idProject, "/").concat(typeOfButton)));

        case 14:
          swal("".concat(message.data.message, "!"));

        case 15:
          h = 0;
          m = 0;
          s = 0;
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
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
  var root, projectsInfo, projects, html;
  return regeneratorRuntime.async(function renderProjects$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          root = document.querySelector('#root');

          if (root) {
            _context2.next = 4;
            break;
          }

          throw new Error('There is a problem finding the HTML to show the projects');

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllprojects"));

        case 6:
          projectsInfo = _context2.sent;
          projects = projectsInfo.data.allProjects.projects;
          html = projects.map(function (element) {
            return "<div class=\"projects__list\" >\n                    <p> ".concat(element.projectName, " </p>\n                    \n                    <div>\n                        <button class=\"button__cronometer\" name=\"activity\" onclick=\"cronometer(event, '").concat(element.projectUuid, "', 'design')\"><img src=\"img/design.png\" alt=\"\"></button>\n                        <button class=\"button__cronometer\" name=\"activity\" onclick=\"cronometer(event, '").concat(element.projectUuid, "', 'call')\"><img src=\"img/call.png\" alt=\"\"></button>\n                        <img src=\"img/task.png\" alt=\"\">\n                        <img src=\"img/calendar.png\" alt=\"\">\n                    </div>\n                </div>\n                ");
          }).join('');
          root.innerHTML = html;
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          swal("Ohhh no!", _context2.t0.response.data, "warning");
          console.error(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}