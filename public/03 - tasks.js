//Handle the form to create a new Task:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener("submit", handleNewTask);

async function handleNewTask(ev) {
  try {
    ev.preventDefault();
    let { taskName, description, limitDate, projectId, statusTask, flag } =
      ev.target.elements;
    taskName = taskName.value;
    description = description.value;
    limitDate = limitDate.value;
    projectId = selectProjectName.value;
    statusTask = statusTask.value;
    flag = flag.value;

    modalCreate.style.display = "none";
    ev.target.reset();

    const taskDetails = {
      taskName,
      description,
      limitDate,
      projectId,
      statusTask,
      flag,
    };
    const tasksCreated = await axios.post("/tasks/newTask", taskDetails);

    //Push the task to the project
    const { uuid } = tasksCreated.data.task;
    const { projectId: idProject } = tasksCreated.data.task;
    await axios.post(`/projects/addTask`, { uuid, idProject }),
      swal("Good job!", "New task added succesfully!", "success");
    renderTasks();
  } catch (error) {
    console.error(error);
  }
}

//Function to get the names of the projects in the "select Project Name"
async function uploadProjectNames() {
  try {
    const projectsInfo = await axios.get(`/projects/getAllProjects`);
    const { infoProjects: projects } = projectsInfo.data;
    const select = document.getElementById("selectProjectName");

    for (let index = 0; index < projects.length; index++) {
      const option = document.createElement("option");
      option.value = projects[index].projectUuid;
      option.innerHTML = projects[index].projectName;
      select.appendChild(option);
    }
  } catch (error) {
    console.error(error);
  }
}

//Render all the tasks
async function renderTasks(tasksToShow) {
  try {
    const taskToday = document.querySelector("#taskToday");
    if (!taskToday)
      throw new Error(
        "There is a problem finding the HTML element to put the data"
      );

    const taskTomorrow = document.querySelector("#taskTomorrow");
    if (!taskTomorrow)
      throw new Error(
        "There is a problem finding the HTML element to put the data"
      );

    const taskGeneral = document.querySelector("#taskGeneral");
    if (!taskGeneral)
      throw new Error(
        "There is a problem finding the HTML element to put the data"
      );

    const projectsInfo = await axios.get(`/projects/getAllProjects`);
    const { infoProjects: projects } = projectsInfo.data;

    if (!tasksToShow) {
      const tasksInfo = await axios.get(`/tasks/getAlltasks`);
      tasksToShow = tasksInfo.data.infoTasks;
    }

    //Add the information of the project to the task
    for (let index = 0; index < tasksToShow.length; index++) {
      const task = tasksToShow[index];

      projects.forEach((project) => {
        if (project.projectUuid === task.projectId) {
          Object.assign(tasksToShow[index], project);
        }
      });
    }

    //Set the today date
    const todayDay = setTodayDay();
    const tomorrowDay = setTomorrowDay();

    let htmlToday = tasksToShow
      .map((element) => {
        if (element.limitDate === todayDay) {
          const limitDate = formatDate(element.limitDate);
          limitStrLength = (text, max_length) => {
            if (text.length > max_length - 3) {
              return text.substring(0, max_length).trimEnd() + "...";
            } else {
              return text;
            }
          };
          const taskName = element.taskName;

          let changeOval =
            element.statusTask === "starting"
              ? "./img/Oval 8.png"
              : element.statusTask === "characterization"
              ? "./img/Oval 9.png"
              : element.statusTask === "design"
              ? "./img/Oval 10.png"
              : element.statusTask === "repairs"
              ? "./img/Oval 16.png"
              : element.statusTask === "toSend"
              ? "./img/Oval 12.png"
              : element.statusTask === "waiting"
              ? "./img/Oval 13.png"
              : element.statusTask === "stuck"
              ? "./img/Oval 14.png"
              : element.statusTask === "freeText"
              ? "./img/Oval 15.png"
              : null;

          return ` <div class="task">
                        <div class="task-titles" onclick='showModalDescription("${
                          element.taskName
                        }", "${element.limitDate}", "${element.description}")'>
                        <div class="task-titles__container">
                            <div class="task-titles__container__oval">
                            <img src="${changeOval}" alt="">
                            </div>
                            <div class="task-titles__container__content">
                                <div class="task-titles__container__content__taskName">
                                <h5>${limitStrLength(taskName, 15)}</h5>
                                </div>
                                <div class="task-titles__container__content__projectName">
                                <p>${element.projectName}</p>
                                </div>
                            </div>

                           
                        </div>
                        </div>
                        <div class="task-date">
                            <p>${limitDate}</p>
                            <img src="./img/edit.png" alt="" onclick='editTask("${
                              element.uuid
                            }")' title="Edit"> 
                            <img src="./img/delete.png" alt="" onclick='removeTask("${
                              element.uuid
                            }", "${element.taskName}", "${
            element.projectId
          }")' title="Remove"> 
                        </div>
                    </div>`;
        }
      })
      .join("");

    taskToday.innerHTML = htmlToday;

    let htmlTommorow = tasksToShow
      .map((element) => {
        if (element.limitDate === tomorrowDay) {
          const limitDate = formatDate(element.limitDate);

          limitStrLength = (text, max_length) => {
            if (text.length > max_length - 3) {
              return text.substring(0, max_length).trimEnd() + "...";
            } else {
              return text;
            }
          };
          const taskName = element.taskName;
          let changeOval =
            element.statusTask === "starting"
              ? "./img/Oval 8.png"
              : element.statusTask === "characterization"
              ? "./img/Oval 9.png"
              : element.statusTask === "design"
              ? "./img/Oval 10.png"
              : element.statusTask === "repairs"
              ? "./img/Oval 16.png"
              : element.statusTask === "toSend"
              ? "./img/Oval 12.png"
              : element.statusTask === "waiting"
              ? "./img/Oval 13.png"
              : element.statusTask === "stuck"
              ? "./img/Oval 14.png"
              : element.statusTask === "freeText"
              ? "./img/Oval 15.png"
              : null;
          return ` <div class="task">
                    <div class="task-titles" onclick='showModalDescription("${
                      element.taskName
                    }", "${element.limitDate}", "${element.description}")'>
                    <div class="task-titles__container">
                        <div class="task-titles__container__oval">
                        <img src="${changeOval}" alt="">
                        </div>
                        <div class="task-titles__container__content">
                            <div class="task-titles__container__content__taskName">
                            <h5>${limitStrLength(taskName, 15)}</h5>
                            </div>
                            <div class="task-titles__container__content__projectName">
                            <p>${element.projectName}</p>
                            </div>
                        </div>

                       
                    </div>
                    </div>
                    <div class="task-date">
                        <p>${limitDate}</p>
                        <img src="./img/edit.png" alt="" onclick='editTask("${
                          element.uuid
                        }")' title="Edit"> 
                        <img src="./img/delete.png" alt="" onclick='removeTask("${
                          element.uuid
                        }", "${element.taskName}", "${
            element.projectId
          }")' title="Remove"> 
                    </div>
                </div>`;
        }
      })
      .join("");

    taskTomorrow.innerHTML = htmlTommorow;

    //This is to sort the tasks by date
    const sortTasksToShow = tasksToShow.sort(function (a, b) {
      a = a.limitDate.split("/").reverse().join("");
      b = b.limitDate.split("/").reverse().join("");
      return a.localeCompare(b);
    });

    let htmlGeneral = sortTasksToShow
      .map((element) => {
        if (
          element.limitDate !== todayDay &&
          element.limitDate !== tomorrowDay
        ) {
          const limitDate = formatDate(element.limitDate);

          limitStrLength = (text, max_length) => {
            if (text.length > max_length - 3) {
              return text.substring(0, max_length).trimEnd() + "...";
            } else {
              return text;
            }
          };
          const taskName = element.taskName;

          let changeOval =
            element.statusTask === "starting"
              ? "./img/Oval 8.png"
              : element.statusTask === "characterization"
              ? "./img/Oval 9.png"
              : element.statusTask === "design"
              ? "./img/Oval 10.png"
              : element.statusTask === "repairs"
              ? "./img/Oval 16.png"
              : element.statusTask === "toSend"
              ? "./img/Oval 12.png"
              : element.statusTask === "waiting"
              ? "./img/Oval 13.png"
              : element.statusTask === "stuck"
              ? "./img/Oval 14.png"
              : element.statusTask === "freeText"
              ? "./img/Oval 15.png"
              : null;

          return ` <div class="task">
                    <div class="task-titles" onclick='showModalDescription("${
                      element.taskName
                    }", "${element.limitDate}", "${element.description}")'>
                    <div class="task-titles__container">
                        <div class="task-titles__container__oval">
                            <img src="${changeOval}" alt="">
                        </div>
                        <div class="task-titles__container__content">
                            <div class="task-titles__container__content__taskName">
                            <h5>${limitStrLength(taskName, 15)}</h5>
                            </div>
                            <div class="task-titles__container__content__projectName">
                            <p>${element.projectName}</p>
                            </div>
                        </div>

                       
                    </div>
                    </div>
                    <div class="task-date">
                        <p>${limitDate}</p>
                        <img src="./img/edit.png" alt="" onclick='editTask("${
                          element.uuid
                        }")' title="Edit"> 
                        <img src="./img/delete.png" alt="" onclick='removeTask("${
                          element.uuid
                        }", "${element.taskName}", "${
            element.projectId
          }")' title="Remove"> 
                    </div>
                </div>`;
        }
      })
      .join("");

    taskGeneral.innerHTML = htmlGeneral;
  } catch (error) {
    swal("Ohhh no!", error.response.data, "warning");
    console.error(error);
  }
}

//Set the day of today
function setTodayDay() {
  try {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  } catch (error) {
    console.error(error);
  }
}

//Set the day of tomorrow
function setTomorrowDay() {
  try {
    let today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    tomorrow = yyyy + "-" + mm + "-" + dd;
    return tomorrow;
  } catch (error) {
    console.error(error);
  }
}

//Delete a tasks
function removeTask(taskId, taskName, projectId) {
  try {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this task ${taskName}!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
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

async function deleteTask(taskId, projectId) {
  try {
    await axios.delete(`/tasks/deleteTask/${taskId}/${projectId}`);
    renderTasks();
  } catch (error) {
    console.error(error);
  }
}

//Update a task:
//This will contain the Task Id to Edit
let taskIdEdit;

async function editTask(idTask) {
  try {
    if (!modalEdit)
      throw new Error("There is a problem finding the modal in the HTML");
    modalEdit.style.display = "block";
    modalEdit.classList.add("showModal");

    const formEdit = document.querySelector("#formEdit");
    if (!formEdit) throw new Error("There is a problem finding form from HTML");
    const taskFound = await axios.get(`tasks/findTask/${idTask}`);
    const { foundTask } = taskFound.data;

    //Set the Project Name
    showProjectNameInDOM(foundTask.projectId).then((data) => {
      let html = `
            <h3>Edit the task</h3>
            <div>
                 
                <input type="text" name="taskName" placeholder="Task Name" value="${foundTask.taskName}" required>
            </div>

            <div>
              
                <input type="text" name="description" placeholder="Description" value="${foundTask.description}" required>
            </div>

            <div>
   
                <select onclick="uploadProjectNamesEdit()" name="projectId" id="selectProjectNameEdit">
                    <option id="option${foundTask.projectId}" value="${foundTask.projectId}" selected disabled hidden>${data}</option>
                </select>
            </div>

            <div> 
                <input type="date" name="limitDate" value="${foundTask.limitDate}" required>
            </div>

            <div>
            <select name="statusTask" id="statusTask">
                <option value="${foundTask.statusTask}" selected disabled hidden>${foundTask.statusTask}</option>
                <option value="starting">Starting</option>
                <option value="characterization">Characterization</option>
                <option value="design">Design</option>
                <option value="repairs">Repairs</option>
                <option value="toSend">To send</option>
                <option value="waiting">Waiting</option>
                <option value="stuck">Stuck</option>
                <option value="freeText ">Free text </option>
            </select>
          </div>

          <div>
            <select name="flag" id="flag">
              <option value="${foundTask.flag}" selected disabled hidden>${foundTask.flag}</option>
              <option value="now">Now</option>
              <option value="urgent">Urgent</option>
              <option value="needChat">Need to chat before</option>
              <option value="fastImprovement">Fast improvement</option>
            </select>
          </div>

            <input type="submit" value="Update task"class="button-form">
        `;
      formEdit.innerHTML = html;
      taskIdEdit = foundTask.uuid;
    });
  } catch (error) {
    console.error(error);
  }
}

//Function to show the project name in the Edit DOM
async function showProjectNameInDOM(projectId) {
  const projectFound = await axios.get(`projects/findProject/${projectId}`);
  return projectFound.data.foundProject.projectName;
}

//Handle Edit
async function handleEdit(ev) {
  try {
    let { taskName, description, projectId, limitDate, statusTask, flag } =
      ev.target.elements;
    taskName = taskName.value;
    description = description.value;
    projectId = projectId.value;
    limitDate = limitDate.value;
    statusTask = statusTask.value;
    flag = flag.value;

    if (!taskName || !description || !limitDate || !projectId)
      throw new Error("You need to complete all the fields");

    if (!modalEdit)
      throw new Error("There is a problem finding modalEdit from HTML");
    modalEdit.style.display = "none";
    const tasksDetails = {
      taskName,
      description,
      projectId,
      limitDate,
      statusTask,
      flag,
    };
    const allTasks = await axios.put(
      `/tasks/editTask/${taskIdEdit}`,
      tasksDetails
    );
    ev.target.reset();
    renderTasks(allTasks);
  } catch (error) {
    swal("Ohhh no!", `${error}`, "warning");
    console.error(error);
  }
}

//Function to get the names of the project in the "select Project Name"
async function uploadProjectNamesEdit() {
  try {
    const projectsInfo = await axios.get(`/projects/getAllProjects`);
    const { infoProjects: projects } = projectsInfo.data;
    const select = document.getElementById("selectProjectNameEdit");

    for (let index = 0; index < projects.length; index++) {
      const option = document.createElement("option");
      option.value = projects[index].projectUuid;
      option.innerHTML = projects[index].projectName;
      select.appendChild(option);
    }
    //The event is going to happen just once
    select.onclick = null;
  } catch (error) {
    console.error(error);
  }
}

//Function to do a filter in the search input
async function handleSearch() {
  try {
    const searchTask = document.querySelector("#search");
    const regEx = searchTask.value;
    const searching = new RegExp(regEx, "i");
    const tasksInfo = await axios.get(`/tasks/getAllTasks`);
    const { infoTasks: tasks } = tasksInfo.data;
    const tasksFiltered = tasks.filter((task) => searching.test(task.taskName));
    renderTasks(tasksFiltered);
  } catch (error) {
    console.error(error);
  }
}

function showModalDescription(taskName, limitDate, description) {
  try {
    if (!modalDescription)
      throw new Error("There is a problem finding the modal in the HTML");
    modalDescription.style.display = "block";
    modalDescription.classList.add("showModal");

    const taskDescriptionInfo = document.querySelector(
      "#showTaskDescriptionInfo"
    );
    if (!taskDescriptionInfo)
      throw new Error("There is a problem finding modal from HTML");

    limitDate = moment(limitDate).format("DD/MM/YYYY");

    let html = `
        <div class="content">
        <div class="content__name"><h4> ${taskName}</h4></div>
        <div class="content__date"><span> ${limitDate}</span></div>
        <div class="content__description"><p>${description}</p></div>
        </div>`;
    taskDescriptionInfo.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}