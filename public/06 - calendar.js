

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

  console.log({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  })

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
      console.log(response);
      googleEvents(events);
      renderCalendarInfo(events);
   
      //   renderCalendarInfoToday(events);
    });
}

function renderCalendarInfo(events) {
  try {
    const calendarInfo = document.querySelector("#calendarInfo");
    let html = "";
    html = events
      .map((element) => {

        const calendarStartDay = moment(element.start.dateTime).format('DD/MM/YY');

        const calendarStartDate = formatCalendarDate(element.start);

        return `
           <div class="task-calendar">
       
   
                  <div class = "principal-date">${calendarStartDay}</div>
         

                  </div>
                  <div class = "task-calendar__content">

                    <div class="task-titles-calendar">
                        <p>${element.summary}</p>
                    </div>

                    <div class="task-date-calendar">
                        <p>${calendarStartDate}</p>
                    </div>
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

const googleEvents = (event) => {
  const date = new Date();
  const momentsHour = moment(date).format("L");
  // "9:00 PM"
 
  const eventToday = document.getElementById("eventToday");
  const noEvent = document.querySelector(".noEvent");
  //  moment(date).format('LT');;
  let html = "";

  html = event
    .map((el) => {
      const formatHourEvent =  moment(el.start.dateTime).format("L"); 
      const reFormat  = moment(el.start.dateTime).format("HH:mm"); 
   
      if (momentsHour === formatHourEvent) {
   
        noEvent.style.display = "none";

        return `
        <p>${reFormat}</p>
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
      startDate.dateTime = moment(startDate.dateTime).format("HH:mm");

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

const currentTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
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