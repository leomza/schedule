"use strict";

var authorizeButton = document.getElementById("authorize_button");
var signoutButton = document.getElementById("signout_button");
/**
 *  On load, called to load the auth2 library and API client library.
 */

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */


function initClient() {
  var CLIENT_ID = "737686618954-d0k28hcsdajurnrt1mj4v7rhv3p87bd4.apps.googleusercontent.com";
  var API_KEY = "AIzaSyBT-xOdFVT38YxGiOY3fbnblgVlbQ0kfO0"; // Array of API discovery doc URLs for APIs used by the quickstart

  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]; // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.

  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  console.log(gapi.client);
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
  })["catch"](function (error) {
    console.log(error);
    renderCalendarInfo(JSON.stringify(error, null, 2));
  });
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */


function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
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
  console.log(gapi.client);
  gapi.client.calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: "startTime"
  }).then(function (response) {
    var events = response.result.items;
    console.log(response);
    googleEvents(events);
    renderCalendarInfo(events); //   renderCalendarInfoToday(events);
  });
}

function renderCalendarInfo(events) {
  try {
    var calendarInfo = document.querySelector("#calendarInfo");
    var html = "";
    html = events.map(function (element) {
      var calendarStartDay = moment(element.start.dateTime).format('DD/MM/YY');
      var calendarStartDate = formatCalendarDate(element.start);
      return "\n           <div class=\"task-calendar\">\n       \n   \n                  <div class = \"principal-date\">".concat(calendarStartDay, "</div>\n         \n\n                  </div>\n                  <div class = \"task-calendar__content\">\n\n                    <div class=\"task-titles-calendar\">\n                        <p>").concat(element.summary, "</p>\n                    </div>\n\n                    <div class=\"task-date-calendar\">\n                        <p>").concat(calendarStartDate, "</p>\n                    </div>\n                  </div>\n\n             </div>\n             ");
    }).join("");
    calendarInfo.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

var googleEvents = function googleEvents(event) {
  var date = new Date();
  var momentsHour = moment(date).format("L"); // "9:00 PM"

  var eventToday = document.getElementById("eventToday");
  var noEvent = document.querySelector(".noEvent"); //  moment(date).format('LT');;

  var html = "";
  html = event.map(function (el) {
    var formatHourEvent = moment(el.start.dateTime).format("L");
    var reFormat = moment(el.start.dateTime).format("HH:mm");

    if (momentsHour === formatHourEvent) {
      noEvent.style.display = "none";
      return "\n        <p>".concat(reFormat, "</p>\n        ");
    }
  }).join("");
  eventToday.innerHTML = html; // const date = new Date();
  // let hour = date.getHours()
};

function formatCalendarDate(startDate) {
  try {
    if (startDate.dateTime) {
      startDate.dateTime = moment(startDate.dateTime).format("HH:mm");
      return startDate.dateTime;
    } else if (startDate.date) {
      startDate.date = moment(startDate.date).format("dddd");
      return "All  ".concat(startDate.date);
    } else {
      startDate = "No specified";
      return startDate;
    }
  } catch (error) {
    console.error(error);
  }
}

var currentTime = function currentTime() {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  hour = updatetime(hour);
  min = updatetime(min);
  var timeOut = setTimeout(currentTime, 1000);
  document.getElementById("clock").innerHTML = "\n    <div class='clock__container'>\n\n\n\n\n   <p class='clock__container__hour'> ".concat(hour, "</p>\n\n   <p class='clock__container__min'> ").concat(min, "</p>\n\n\n    </div>\n    ");
};

var updatetime = function updatetime(e) {
  if (e < 10) {
    return "0" + e;
  } else {
    return e;
  }
};

currentTime();