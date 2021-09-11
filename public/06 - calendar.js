// Your TIMEOFFSET Offset
const TIMEOFFSET = "+05:30";

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
  let endDate = new Date(
    new Date(startDate).setHours(startDate.getHours() + 1)
  );

  return {
    start: startDate,
    end: endDate,
  };
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
      summary: `${title}`, //This is require
      description: `${description}`, //This is optional
      start: {
        dateTime: dateTime["start"],
        timeZone: "Asia/Jerusalem",
      },
      end: {
        dateTime: dateTime["end"],
        timeZone: "Asia/Jerusalem",
      },
    };
    ev.target.reset();
    createEvent(eventToCreate);
  } catch (error) {
    console.error(error);
  }
}

async function createEvent(eventToCreate) {
  try {
    const eventCreated = await axios.post(
      `/calendar/createEvent`,
      eventToCreate
    );
  } catch (error) {
    console.error(error);
  }
}

// Get all the events between two dates in Google calendar
async function getEvents() {
  try {
    // With these dates I will call all the events between them
    let startDate = "2020-10-03T00:00:00.000Z";
    let endDate = "2021-10-04T00:00:00.000Z";

    const eventsInfo = await axios.post(`/calendar/getAllEvents`, {
      startDate,
      endDate,
    });
  } catch (error) {
    console.error(error);
  }
}

const CLIENT_ID =
  "737686618954-d0k28hcsdajurnrt1mj4v7rhv3p87bd4.apps.googleusercontent.com";
const API_KEY = "AIzaSyBT-xOdFVT38YxGiOY3fbnblgVlbQ0kfO0";

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const authorizeButton = document.getElementById("authorize_button");
const signoutButton = document.getElementById("signout_button");

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
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      },
      function (error) {
        renderCalendarInfo(JSON.stringify(error, null, 2));
      }
    );
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    signoutButton.style.display = "block";
    listUpcomingEvents();
  } else {
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
  gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    })
    .then(function (response) {
      const events = response.result.items;

      renderCalendarInfo(events);
      pepe(events);
      //   renderCalendarInfoToday(events);
    });
}

function renderCalendarInfo(events) {
  try {
    console.log(events)
    const calendarInfo = document.querySelector("#calendarInfo");
    let html = "";
    html = events.map((element) => {
      // console.log(element.start.dateTime);
      const calendarStartDate = formatCalendarDate(element.start);
      // console.log(calendarStartDate.dateTime);

      return `
           <div class="task-calendar">
                    <div class="task-titles-calendar">
                        <p>${element.summary}</p>
                    </div>

                    <div class="task-date-calendar">
                        <p>${calendarStartDate}</p>
                    </div>

                </div>
             `;
    })
      .join("");

    calendarInfo.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

const pepe = (event) => {
  const date = new Date();
  const momentsHour = moment(date).format('LT');
  // "9:00 PM";
  const eventToday = document.getElementById("eventToday");
  const noEvent = document.querySelector(".noEvent");
  //  moment(date).format('LT');;
  let html = "";

  html = event
    .map((el) => {
      if (momentsHour === el.start.dateTime) {
        noEvent.style.display = "none";

        return `
        <p>${el.start.dateTime}</p>
        `;
      }
    })
    .join("");

  eventToday.innerHTML = html;
  // const date = new Date();
  // let hour = date.getHours()
};
function formatCalendarDate(startDate) {
  try {
    if (startDate.dateTime) {
      startDate.dateTime = moment(startDate.dateTime).format("LT");

      return startDate.dateTime;
    } else if (startDate.date) {
      startDate.date = moment(startDate.date).format("dddd");
      return `All  ${startDate.date}`;
    } else {
      startDate = "No specified";
      return startDate;
    }
  } catch (error) {
    console.error(error);
  }
}

// function currentTime() {
//     var date = new Date(); /* creating object of Date class */
//     var hour = date.getHours();
//     var min = date.getMinutes();
//     var sec = date.getSeconds();
//     var midday = "AM";
//     midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
//     hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
//     hour = updateTime(hour);
//     min = updateTime(min);
//     sec = updateTime(sec);
//     document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " " + midday; /* adding time to the div */
//       var t = setTimeout(currentTime, 1000); /* setting timer */
//   }

//   function updateTime(k) { /* appending 0 before time elements if less than 10 */
//     if (k < 10) {
//       return "0" + k;
//     }
//     else {
//       return k;
//     }
//   }
//  currentTime()
const currentTime = () => {
  const date = new Date();
  let hour = date.getHours();

  let min = date.getMinutes();
  hour = hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  hour = updatetime(hour);
  min = updatetime(min);

  let timeOut = setTimeout(currentTime, 1000);
  document.getElementById("clock").innerHTML = `
    <div class='clock__container'>




   <p class='clock__container__hour'> ${hour}</p>

   <p class='clock__container__min'> ${min}</p>


    </div>
    `;
};
const updatetime = (e) => {
  if (e < 10) {
    return "0" + e;
  } else {
    return e;
  }
};

currentTime();

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
