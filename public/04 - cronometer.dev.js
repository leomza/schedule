"use strict";

//Cronometer
function init() {
  document.querySelector(".start").addEventListener("click", cronometer);
  document.querySelector(".stop").addEventListener("click", stop);
  document.querySelector(".restart").addEventListener("click", restart);
  h = 0;
  m = 0;
  s = 0;
  document.getElementById("hms").innerHTML = "<p style=\"margin:0\">00</p>\n                                                <p style=\"margin:0\">00</p>";
}

function cronometer() {
  write();
  id = setInterval(write, 1000);
  document.querySelector(".start").removeEventListener("click", cronometer);
}

function write() {
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

  document.getElementById("hms").innerHTML = "<p style=\"margin:0\">".concat(sAux, "</p>\n                                                <p style=\"margin:0\">").concat(mAux, "</p>");
}

function stop() {
  clearInterval(id);
  document.querySelector(".start").addEventListener("click", cronometer);
}

function restart() {
  clearInterval(id);
  document.getElementById("hms").innerHTML = "<p style=\"margin:0\">00</p>\n                                                <p style=\"margin:0\">00</p>";
  h = 0;
  m = 0;
  s = 0;
  document.querySelector(".start").addEventListener("click", cronometer);
} //Render all the projects


function renderProjects() {
  var root, projectsInfo, projects, html;
  return regeneratorRuntime.async(function renderProjects$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          root = document.querySelector('#root');

          if (root) {
            _context.next = 4;
            break;
          }

          throw new Error('There is a problem finding the HTML to show the projects');

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllprojects"));

        case 6:
          projectsInfo = _context.sent;
          projects = projectsInfo.data.allProjects.projects;
          html = projects.map(function (element) {
            return "<div>\n                    <p> ".concat(element.projectName, " </p>\n                    \n                <div>\n                    <img src=\"img/calendar.png\" alt=\"\">\n                    <img src=\"img/task.png\" alt=\"\">\n                    <img src=\"img/call.png\" alt=\"\">\n                    <img src=\"img/design.png\" alt=\"\">\n                </div>\n                </div>\n                ");
          }).join('');
          root.innerHTML = html;
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          swal("Ohhh no!", _context.t0.response.data, "warning");
          console.error(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

{
  /* <p> ${element.projectUuid} </p> */
}