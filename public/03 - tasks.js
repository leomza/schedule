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
        await axios.post(`/projects/addTask/${tasksCreated.data.newTask.uuid}/${tasksCreated.data.newTask.projectId}`)
        swal("Good job!", "New task added succesfully!", "success");
        //renderTasks(tasksCreated.data.allTasks.tasks);
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