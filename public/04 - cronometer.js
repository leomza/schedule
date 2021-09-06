//Cronometer
function init() {
    try {
        document.querySelector("#saveTime").addEventListener("click", saveTime);
        h = 0;
        m = 0;
        s = 0;
        document.getElementById("hms").innerHTML = `<div class="cronometer--number">
                                                    <p >00</p>
                                                    <p >00</p>
                                                    </div>`;
    } catch (error) {
        console.error(error);
    }
}

//To know what button I press and the id of the project
let eventTarget;
let idProject;
let typeOfButton;

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
        let hAux, mAux, sAux;
        s++;
        if (s > 59) { m++; s = 0; }
        if (m > 59) { h++; m = 0; }
        if (h > 24) { h = 0; }

        if (s < 10) { sAux = "0" + s; } else { sAux = s; }
        if (m < 10) { mAux = "0" + m; } else { mAux = m; }
        if (h < 10) { hAux = "0" + h; } else { hAux = h; }

        document.getElementById("hms").innerHTML = `<div class="cronometer--number">
                                                    <p class="cronometer--number">${sAux}</p>
                                                    <p class="cronometer--number">${mAux}</p>
                                                    </div>`;
    } catch (error) {
        console.error(error);
    }
}

async function saveTime() {
    try {
        const userActivities = document.getElementsByName('activity');
        clearInterval(id);
        document.getElementById("hms").innerHTML = `<div class="cronometer--number">
        <p >00</p>
        <p >00</p>
        </div>`;

        eventTarget.classList.remove('button__brightness')

        userActivities.forEach(activity => {
            activity.disabled = false;
            activity.classList.remove('button__disabled')
        })
        let timeInHours = h + (m / 60) + (s / 60 / 60);
        timeInHours = parseFloat(timeInHours);

        if (idProject) {
            const message = await axios.post(`/projects/setTimeInProject/${idProject}/${timeInHours}/${typeOfButton}`);
            await axios.post(`/clients/setTimeInClient/${idProject}/${typeOfButton}`);
            swal(`${message.data.message}!`);
        }
        h = 0; m = 0; s = 0;
    } catch (error) {
        console.error(error);
    }
}

function disabledButtons(event) {
    try {
        const userActivities = document.getElementsByName('activity');

        userActivities.forEach(activity => {
            activity.disabled = true;
            activity.classList.add('button__disabled')
        })
        event.target.classList.add('button__brightness')
    } catch (error) {
        console.error(error);
    }
}

//Render all the projects
async function renderProjects() {
    try {
        const root = document.querySelector('#root');
        if (!root) throw new Error('There is a problem finding the HTML to show the projects');

        const projectsInfo = await axios.get(`/projects/getAllprojects`);
        const { projects } = projectsInfo.data.allProjects;

        let html = projects.map(element => {
            return (
                `<div class="projects__list" >
                    <p> ${element.projectName} </p>
                    
                    <div class="projects__list__buttons">

                      <div class="projects__list__buttons__couple-one">
                        <button class="button__cronometer" name="activity" onclick="cronometer(event, '${element.projectUuid}', 'design')"><img src="img/design.png" alt=""></button>
                        <button class="button__cronometer" name="activity" onclick="cronometer(event, '${element.projectUuid}', 'call')"><img src="img/Group 674.png" alt=""></button>
                        </div>


                        <div class="projects__list__buttons__couple-two">
                        <img src="img/task.png" alt="">
                        <img src="img/calendar.png" alt="">
                        </div>
                    </div>
                </div>
                `
            );
        }).join('');

        root.innerHTML = html;

    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
}