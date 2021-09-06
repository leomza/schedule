// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

    return {
        'start': startDate,
        'end': endDate
    }
};

let dateTime = dateTimeForCalander();

//Handle the form to create an event
function handleCreateEvent(ev) {
    try {
        ev.preventDefault();
        let { title, description, startEvent, endEvent } = ev.target.elements;
        title = eventTitle.value;
        description = eventDescription.value;
        startEvent = eventStart.value;
        endEvent = eventEnd.value;

        //Create an Event in Google Calendar
        let eventToCreate = {
            'summary': `${title}`, //This is require
            'description': `${description}`, //This is optional
            'start': {
                'dateTime': dateTime['start'],
                'timeZone': 'Asia/Jerusalem'
            },
            'end': {
                'dateTime': dateTime['end'],
                'timeZone': 'Asia/Jerusalem'
            }
        };
        ev.target.reset();
        createEvent(eventToCreate)
    } catch (error) {
        console.error(error);
    }
}

async function createEvent(eventToCreate) {
    try {
        const eventCreated = await axios.post(`/calendar/createEvent`, eventToCreate)
        console.log(eventCreated);
    } catch (error) {
        console.error(error);
    }
}

// Get all the events between two dates in Google calendar
async function getEvents() {
    try {
        // With these dates I will call all the events between them
        let startDate = '2020-10-03T00:00:00.000Z';
        let endDate = '2021-10-04T00:00:00.000Z';

        const eventsInfo = await axios.post(`/calendar/getAllEvents`, { startDate, endDate })
        console.log(eventsInfo);
    } catch (error) {
        console.error(error);
    }
}

