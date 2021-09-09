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

var CLIENT_ID = "737686618954-d0k28hcsdajurnrt1mj4v7rhv3p87bd4.apps.googleusercontent.com";
var API_KEY = "AIzaSyBT-xOdFVT38YxGiOY3fbnblgVlbQ0kfO0"; // Array of API discovery doc URLs for APIs used by the quickstart

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]; // Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.

var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
/**
*  On load, called to load the auth2 library and API client library.
*/

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}
/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/


function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus); // Handle the initial sign-in state.

    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function (error) {
    renderCalendarInfo(JSON.stringify(error, null, 2));
  });
}
/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/


function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}
/**
*  Sign in the user upon button click.
*/


function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
/**
*  Sign out the user upon button click.
*/


function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/


function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': new Date().toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function (response) {
    var events = response.result.items;
    renderCalendarInfo(events); //renderCalendarInfoToday(events);
  });
}

function renderCalendarInfo(events) {
  try {
    var calendarInfo = document.querySelector('#calendarInfo');
    var html = '';
    html = events.map(function (element) {
      var calendarStartDate = formatCalendarDate(element.start);
      return "\n            <div>\n                <div>\n                    <p>".concat(element.summary, "</p>\n                </div>\n\n                <div>\n                    <p>").concat(calendarStartDate, "</p>\n                </div>\n            </div>");
    }).join('');
    calendarInfo.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function formatCalendarDate(startDate) {
  try {
    if (startDate.dateTime) {
      startDate.dateTime = moment(startDate.dateTime).format('lll');
      return startDate.dateTime;
    } else if (startDate.date) {
      startDate.date = moment(startDate.date).format("MMM Do YY");
      return startDate.date;
    } else {
      startDate = 'No specified';
      return startDate;
    }
  } catch (error) {
    console.error(error);
  }
}
/* //Show the events that are going to happen today
function renderCalendarInfoToday(events) {
    try {
        const eventsToday = document.querySelector('#eventsToday');
        let html = '';
        html = events.map(element => {
            const startTime = formatHour(element.start.dateTime);
            return (`
            <div>
                <div>
                    <p>${element.summary}</p>
                </div>

                <div>
                    <p>${startTime}</p>
                </div>
            </div>`
            )
        }).join('');
        eventsToday.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

function formatHour(element){
    try {
        let today = moment().format('MMMM Do YYYY');
        if (moment(element).format('MMMM Do YYYY') === today){
        }   
    } catch (error) {
        console.error(error);
    }
} */