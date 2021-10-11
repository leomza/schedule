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
let limitCallForTheClient;
let generalCallTime;
let generalRecreationTime;
let generalEatTime;

async function cronometer(event, projectId, typeActivity, limitPerDay) {
    try {
        eventTarget = event.target;
        idProject = projectId;
        typeOfButton = typeActivity;

        if (limitPerDay === 'general') {
            const generalTime = await axios.get(`settings/getGeneralTimeInformation`);
            const { infoSettings } = generalTime.data;

            switch (typeOfButton) {
                case 'call':
                    limitPerDay = infoSettings[0].generalTimeCall;
                    generalCallTime = infoSettings[0].generalTimeCall;
                    break;
                case 'recreation':
                    limitPerDay = infoSettings[0].generalTimeRecreation;
                    generalRecreationTime = infoSettings[0].generalTimeRecreation;
                    break;
                case 'eat':
                    limitPerDay = infoSettings[0].generalTimeEat;
                    generalEatTime = infoSettings[0].generalTimeEat;
                    break;
            }
        }

        limitCallForTheClient = limitPerDay;

        setTextHTMLSaveTime(eventTarget, idProject);
        disabledButtons(event);
        write();
        id = setInterval(write, 1000);
    } catch (error) {
        console.error(error);
    }
}

async function write() {
    try {
        let hAux, mAux, sAux;
        s++;
        if (s > 59) { m++; s = 0; }
        if (m > 59) { h++; m = 0; }
        if (h > 24) { h = 0; }

        if (s < 10) { sAux = "0" + s; } else { sAux = s; }
        if (m < 10) { mAux = "0" + m; } else { mAux = m; }
        if (h < 10) { hAux = "0" + h; } else { hAux = h; }

        if (m == generalCallTime && s == 0 && typeOfButton === 'call') {
            const backColorsnumbers = document.querySelector('.cronometer');
            backColorsnumbers.classList.add('alertRed')
            swal("Alert", `You have been in a call for more than ${generalCallTime} minutes`, "warning");

        } else if (m == generalRecreationTime && s == 0 && typeOfButton === 'recreation') {
            const backColorsnumbers = document.querySelector('.cronometer');
            backColorsnumbers.classList.add('alertRed')
            swal("Alert", `You have been at rest for more than ${generalRecreationTime} minutes`, "warning");

        } else if (m == generalEatTime && s == 0 && typeOfButton === 'eat') {
            const backColorsnumbers = document.querySelector('.cronometer');
            backColorsnumbers.classList.add('alertRed')
            swal("Alert", `You have been eating for more than ${generalEatTime} minutes`, "warning");
        }

        //Condition to send an email
        if (h == 1 && m == 0 && s == 0 && typeOfButton === 'call') {
            await axios.post(`/tasks/sendEmail/${typeOfButton}`);

        } else if (h == 1 && m == 30 && s == 0 && (typeOfButton === 'recreation' || typeOfButton === 'eat')) {
            await axios.post(`/tasks/sendEmail/${typeOfButton}`);
        }

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

        const backColorsnumbers = document.querySelector('.cronometer');
        backColorsnumbers.classList.remove('alertRed')

        if (idProject) {
            const message = await axios.post(`/projects/setTimeInProject/${idProject}/${timeInHours}/${typeOfButton}`);
            await axios.post(`/clients/setTimeInClient/${idProject}/${typeOfButton}`);
            swal(`${message.data.message}!`).then(() => {
                renderClients();
            })
        }

        const buttonSaveTime = document.getElementById('saveTime');
        buttonSaveTime.innerHTML = '';
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

        const clientsInfo = await axios.get(`/clients/getAllClients`);
        const { infoClients: clients } = clientsInfo.data;

        const projectsInfo = await axios.get(`/projects/getAllprojects`);
        projectsToShow = projectsInfo.data.infoProjects;

        //Add the information of the user to the project
        for (let index = 0; index < projectsToShow.length; index++) {
            const project = projectsToShow[index];

            clients.forEach(client => {
                if (client.id === project.clientId) {
                    Object.assign(projectsToShow[index], client);
                }
            });
        };

        let html = projectsToShow.map(element => {
            return (
                `<div class="projects__list" >
                    <p> ${element.projectName} </p>
                    <p> ${element.clientname} </p>

                    
                    <div class="projects__list__buttons">

                      <div class="projects__list__buttons__couple-one">
                        <button class="button__cronometer" name="activity" onclick="cronometer(event, '${element.projectUuid}', 'design', '${element.callLimitPerDay}')"><img src="img/design.png" alt=""></button>
                        <button class="button__cronometer" name="activity" onclick="cronometer(event, '${element.projectUuid}', 'call', '${element.callLimitPerDay}')"><img src="img/Group 674.png" alt=""></button>
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

//Function to set in the HTML a custom buttom to save the time
async function setTextHTMLSaveTime(eventTarget, idProject) {
    try {
        //Get the element to insert the text
        const buttonSaveTime = document.getElementById('saveTime');

        let nameOfTheProject;
        if (idProject) {
            const projectFound = await axios.get(`projects/findProject/${idProject}`);
            nameOfTheProject = projectFound.data.foundProject.projectName;
        } else {
            nameOfTheProject = 'General'
        }

        buttonSaveTime.innerHTML = `<img src="${eventTarget.attributes.src.nodeValue}" alt="" />
                                    <p> ${nameOfTheProject} </p>`
    } catch (error) {
        console.error(error);
    }
};