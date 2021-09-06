const { google } = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Insert new event to Google Calendar
export async function insertEvent(req, res) {
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: req.body
        });
        res.send({ message: "The event was submited", response })
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        res.status(500).send(error.message);
    }
};

// Get all the events between two dates
export async function getAllEvents(req, res) {
    try {
        const { startDate, endDate } = req.body
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: startDate,
            timeMax: endDate,
            timeZone: 'Asia/Jerusalem'
        });
        let items = response['data']['items'];
        res.send({ message: "These are the events between that dates", items })
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        res.status(500).send(error.message);
    }
};

// Delete an event from eventID
/* const deleteEvent = async (eventId) => {

    try {
        let response = await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        });

        if (response.data === '') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
    }
};

let eventId = 'hkkdmeseuhhpagc862rfg6nvq4';

deleteEvent(eventId)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    }); */