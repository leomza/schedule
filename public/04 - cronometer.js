//Cronometer
function init() {
    document.querySelector(".start").addEventListener("click", cronometer);
    document.querySelector(".stop").addEventListener("click", stop);
    document.querySelector(".restart").addEventListener("click", restart);
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML = `<p style="margin:0">00</p>
                                                <p style="margin:0">00</p>`;
}
function cronometer() {
    write();
    id = setInterval(write, 1000);
    document.querySelector(".start").removeEventListener("click", cronometer);
}
function write() {
    var hAux, mAux, sAux;
    s++;
    if (s > 59) { m++; s = 0; }
    if (m > 59) { h++; m = 0; }
    if (h > 24) { h = 0; }

    if (s < 10) { sAux = "0" + s; } else { sAux = s; }
    if (m < 10) { mAux = "0" + m; } else { mAux = m; }
    if (h < 10) { hAux = "0" + h; } else { hAux = h; }

    document.getElementById("hms").innerHTML = `<p style="margin:0">${sAux}</p>
                                                <p style="margin:0">${mAux}</p>`;
}
function stop() {
    clearInterval(id);
    document.querySelector(".start").addEventListener("click", cronometer);

}
function restart() {
    clearInterval(id);
    document.getElementById("hms").innerHTML = `<p style="margin:0">00</p>
                                                <p style="margin:0">00</p>`;
    h = 0; m = 0; s = 0;
    document.querySelector(".start").addEventListener("click", cronometer);
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
                `<div>
                    <p> ${element.projectName} </p>
                    
                <div>
                    <img src="img/calendar.png" alt="">
                    <img src="img/task.png" alt="">
                    <img src="img/call.png" alt="">
                    <img src="img/design.png" alt="">
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

{/* <p> ${element.projectUuid} </p> */ }