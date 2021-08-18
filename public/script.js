let timer = true;
let countInterval;
let min;
let sec;

//Seteo el tiempo del temporizador
function setTime(event, activity, minutos, segundos) {

    disabledButtons(event);

    let duration = minutos * 60 + segundos;

    element = document.querySelector('#count-down-timer');
    element.textContent = `${paddedFormat(minutos)}:${paddedFormat(segundos)}`;

    if (timer === true) {
        startCountDown(--duration, element);
    } else {
        stopCountDown(activity);
    }
}

//Devuelvo valor rellenado. Ejemplo: 1 minuto 2 segundos = 01 minutos 02 segundos
function paddedFormat(num) {
    return num < 10 ? "0" + num : num;
}

//Con esta funcion empiezo la cuenta regresiva
function startCountDown(duration, element) {
    timer = false;

    let secondsRemaining = duration;
    min = 0;
    sec = 0;

    countInterval = setInterval(function () {

        min = parseInt(secondsRemaining / 60);
        sec = parseInt(secondsRemaining % 60);

        element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

        secondsRemaining = secondsRemaining - 1;

        if (secondsRemaining < 20) { element.style.color = 'red' };
        if (secondsRemaining < 0) { clearInterval(countInterval) };

    }, 1000);
}

async function stopCountDown(activity) {
    timer = true;
    clearInterval(countInterval);
    await axios.post(`/activity/setActivity`, { activity, min, sec });
    renderActivities();
}

async function renderActivities() {
    try {
        const infoActivities = await axios.get(`/activity/infoActivity`);
        const root = document.querySelector('#root');
        let html = "";
        const { activities } = infoActivities.data.allActivities;
        activities.forEach(activity => {
            html += ` <div>
                    <p>${activity.activity}</p>
                    <p>${activity.minutes}:</p>
                    <p>${activity.seconds}</p>
                    </div>`
        });
        root.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

function disabledButtons(event) {
    //ACA HAY QUE DESABILITAR LOS OTROS BOTONES QUE NO SE TOCARON!
}

