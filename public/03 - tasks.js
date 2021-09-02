//Handle the form to create a new Task:
const handleForm = document.querySelector("#formCreate");
handleForm.addEventListener('submit', handleNewTask);

async function handleNewTask(ev) {
    try {
        ev.preventDefault();
        let { taskName, description, limitDate, projectId } = ev.target.elements
        taskName = taskName.value;
        description = description.value;
        limitDate = limitDate.value;
        projectId = selectProjectName.value;

        modalCreate.style.display = "none";
        ev.target.reset();

        const taskDetails = { taskName, description, limitDate, projectId };
        const tasksCreated = await axios.post('/tasks/newTask', taskDetails);

        //Push the task to the project
        const { uuid } = tasksCreated.data.newTask;
        const { projectId: idProject } = tasksCreated.data.newTask;
        await axios.post(`/projects/addTask`, { uuid, idProject }),
            swal("Good job!", "New task added succesfully!", "success");
        renderTasks(tasksCreated.data.allTasks.tasks);
    } catch (error) {
        console.error(error);
    }
}

//Function to get the names of the projects in the "select Project Name"
async function uploadProjectNames() {
    try {
        const projectsInfo = await axios.get(`/projects/getAllProjects`);
        const { projects } = projectsInfo.data.allProjects;
        const select = document.getElementById('selectProjectName');

        for (let index = 0; index < projects.length; index++) {
            const option = document.createElement('option');
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
        const root = document.querySelector('#root');
        if (!root) throw new Error('There is a problem finding the HTML element to put the data');

        const projectsInfo = await axios.get(`/projects/getAllProjects`);
        const { projects } = projectsInfo.data.allProjects;

        if (!tasksToShow) {
            const tasksInfo = await axios.get(`/tasks/getAlltasks`);
            const { tasks } = tasksInfo.data.allTasks;
            tasksToShow = tasks;
        }

        //Add the information of the project to the task
        for (let index = 0; index < tasksToShow.length; index++) {
            const task = tasksToShow[index];

            projects.forEach(project => {
                if (project.projectUuid === task.projectId) {
                    Object.assign(tasksToShow[index], project);
                }
            });
        };

        let html = tasksToShow.map(element => {
            return (
                `<div style="background-color: green;">
                    <p>${element.taskName}</p>
                    <p>${element.projectName}</p>
                    <p>${element.limitDate}</p>
                    <i class="fas fa-edit table__edit" onclick='editTask("${element.uuid}")' title="Edit"></i>
                    <i class="fas fa-trash table__remove" onclick='removeTask("${element.uuid}", "${element.taskName}", "${element.projectId}")' title="Remove"></i>
                </div>`
            );
        }).join('');

        root.innerHTML = html;

    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
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
        })
            .then((willDelete) => {
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
        const tasksInfo = await axios.delete(`/tasks/deleteTask/${taskId}/${projectId}`);
        renderTasks(tasksInfo.data.allTasks.tasks);
    } catch (error) {
        console.error(error);
    }
}

//Update a task:
//This will contain the Task Id to Edit
let taskIdEdit;

async function editTask(idTask) {
    try {
        if (!modalEdit) throw new Error('There is a problem finding the modal in the HTML');
        modalEdit.style.display = "block";
        modalEdit.classList.add("showModal");

        const formEdit = document.querySelector("#formEdit");
        if (!formEdit) throw new Error('There is a problem finding form from HTML');
        const taskFound = await axios.get(`tasks/findTask/${idTask}`);
        const { foundTask } = taskFound.data;

        //Set the Project Name
        showProjectNameInDOM(foundTask.projectId).then((data) => {
            let html = `
            <h3>Edit the task</h3>
            <div>
                <label for="taskName">Task Name:</label>
                <input type="text" name="taskName" placeholder="Task Name" value="${foundTask.taskName}" required>
            </div>

            <div>
                <label for="description">Description:</label>
                <input type="text" name="description" placeholder="Description" value="${foundTask.description}" required>
            </div>

            <div>
                <label for="selectProjectName">Select a project</label>
                <select onclick="uploadProjectNamesEdit()" name="selectProjectName" id="selectProjectName">
                    <option id="option${foundTask.projectId}" value="${foundTask.projectId}" selected disabled hidden>${data}</option>
                </select>
            </div>

            <div>
                <label for="limitDate">Select a limit date:</label>
                <input type="date" name="limitDate" value="${foundTask.limitDate}" required>
            </div>

            <input type="submit" value="Create task">
        `
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
        let { taskName, description, limitDate, projectId } = ev.target.elements
        taskName = taskName.value;
        description = selectProjectNameEdit.value;
        limitDate = limitDate.value;
        projectId = projectId.value;

        if (!taskName || !description || !limitDate || !projectId)
            throw new Error("You need to complete all the fields");

        if (!modalEdit) throw new Error('There is a problem finding modalEdit from HTML');
        modalEdit.style.display = "none";
        ev.target.reset();

        const tasksDetails = { taskName, description, limitDate, projectId };
        console.log(tasksDetails);
        //const allTasks = await axios.put(`/tasks/editTask/${taskIdEdit}`, tasksDetails);
        //renderProjects(allTasks);
    } catch (error) {
        swal("Ohhh no!", `${error}`, "warning");
        console.error(error);
    };
};

//Function to get the names of the project in the "select Project Name"
async function uploadProjectNamesEdit() {
    try {
        const projectsInfo = await axios.get(`/projects/getAllProjects`);
        const { projects } = projectsInfo.data.allProjects;
        const select = document.getElementById('selectProjectNameEdit');

        for (let index = 0; index < projects.length; index++) {
            const option = document.createElement('option');
            option.value = projects[index].uuid;
            option.innerHTML = projects[index].projectName;
            select.appendChild(option);
        }
        //The event is going to happen just once
        select.onclick = null;
    } catch (error) {
        console.error(error);
    }
}