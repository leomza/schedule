"use strict";

//Handle the form to create a new Task:
var handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewTask);

function handleNewTask(ev) {
  var _ev$target$elements, taskName, description, limitDate, projectId, taskDetails, tasksCreated;

  return regeneratorRuntime.async(function handleNewTask$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ev.preventDefault();
          _ev$target$elements = ev.target.elements, taskName = _ev$target$elements.taskName, description = _ev$target$elements.description, limitDate = _ev$target$elements.limitDate, projectId = _ev$target$elements.projectId;
          taskName = taskName.value;
          description = description.value;
          limitDate = limitDate.value;
          projectId = selectProjectName.value;
          modalCreate.style.display = "none";
          ev.target.reset();
          taskDetails = {
            taskName: taskName,
            description: description,
            limitDate: limitDate,
            projectId: projectId
          };
          _context.next = 12;
          return regeneratorRuntime.awrap(axios.post('/tasks/newTask', taskDetails));

        case 12:
          tasksCreated = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(axios.post("/projects/addTask/".concat(tasksCreated.data.newTask.uuid, "/").concat(tasksCreated.data.newTask.projectId)));

        case 15:
          swal("Good job!", "New task added succesfully!", "success"); //renderTasks(tasksCreated.data.allTasks.tasks);

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
          projects = projectsInfo.data.allProjects.projects;
          select = document.getElementById('selectProjectName');

          for (index = 0; index < projects.length; index++) {
            option = document.createElement('option');
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
}