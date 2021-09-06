"use strict";

// Your TIMEOFFSET Offset
var TIMEOFFSET = '+05:30'; // Get date-time string for calender

var dateTimeForCalander = function dateTimeForCalander() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;

  if (month < 10) {
    month = "0".concat(month);
  }

  var day = date.getDate();

  if (day < 10) {
    day = "0".concat(day);
  }

  var hour = date.getHours();

  if (hour < 10) {
    hour = "0".concat(hour);
  }

  var minute = date.getMinutes();

  if (minute < 10) {
    minute = "0".concat(minute);
  }

  var newDateTime = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute, ":00.000").concat(TIMEOFFSET);
  var event = new Date(Date.parse(newDateTime));
  var startDate = event; // Delay in end time is 1

  var endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));
  return {
    'start': startDate,
    'end': endDate
  };
};

var dateTime = dateTimeForCalander(); //Handle the form to create an event

function handleCreateEvent(ev) {
  try {
    ev.preventDefault();
    var _ev$target$elements = ev.target.elements,
        title = _ev$target$elements.title,
        description = _ev$target$elements.description,
        startEvent = _ev$target$elements.startEvent,
        endEvent = _ev$target$elements.endEvent;
    title = eventTitle.value;
    description = eventDescription.value;
    startEvent = eventStart.value;
    endEvent = eventEnd.value; //Create an Event in Google Calendar

    var eventToCreate = {
      'summary': "".concat(title),
      //This is require
      'description': "".concat(description),
      //This is optional
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
    createEvent(eventToCreate);
  } catch (error) {
    console.error(error);
  }
}

function createEvent(eventToCreate) {
  var eventCreated;
  return regeneratorRuntime.async(function createEvent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.post("/calendar/createEvent", eventToCreate));

        case 3:
          eventCreated = _context.sent;
          console.log(eventCreated);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // Get all the events between two dates in Google calendar


function getEvents() {
  var startDate, endDate, eventsInfo;
  return regeneratorRuntime.async(function getEvents$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // With these dates I will call all the events between them
          startDate = '2020-10-03T00:00:00.000Z';
          endDate = '2021-10-04T00:00:00.000Z';
          _context2.next = 5;
          return regeneratorRuntime.awrap(axios.post("/calendar/getAllEvents", {
            startDate: startDate,
            endDate: endDate
          }));

        case 5:
          eventsInfo = _context2.sent;
          console.log(eventsInfo);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}