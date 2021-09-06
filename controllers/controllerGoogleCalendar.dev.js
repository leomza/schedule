"use strict";

var _require = require('googleapis'),
    google = _require.google;

require('dotenv').config(); // Provide the required configuration


var CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
var calendarId = process.env.CALENDAR_ID; // Google calendar API settings

var SCOPES = 'https://www.googleapis.com/auth/calendar';
var calendar = google.calendar({
  version: "v3"
});
var auth = new google.auth.JWT(CREDENTIALS.client_email, null, CREDENTIALS.private_key, SCOPES); // Insert new event to Google Calendar

var insertEvent = function insertEvent() {
  var response;
  return regeneratorRuntime.async(function insertEvent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: req.body
          }));

        case 3:
          response = _context.sent;

          if (!(response['status'] == 200 && response['statusText'] === 'OK')) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", 1);

        case 8:
          return _context.abrupt("return", 0);

        case 9:
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log("Error at insertEvent --> ".concat(_context.t0));
          return _context.abrupt("return", 0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.insertEvent = insertEvent; // Get all the events between two dates

/* const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });

        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

//ESTAS SON LAS FECHAS QUE CON LAS QUE VOY A LLAMAR A TODOS LOS EVENTOS
 let start = '2020-10-03T00:00:00.000Z';
 let end = '2020-10-04T00:00:00.000Z';

 getEvents(start, end)
     .then((res) => {
         console.log(res);
     })
     .catch((err) => {
         console.log(err);
     }); */
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