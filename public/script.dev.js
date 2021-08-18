"use strict";

var timer = true;
var countInterval;
var min;
var sec; //Seteo el tiempo del temporizador

function setTime(event, activity, minutos, segundos) {
  disabledButtons(event);
  var duration = minutos * 60 + segundos;
  element = document.querySelector('#count-down-timer');
  element.textContent = "".concat(paddedFormat(minutos), ":").concat(paddedFormat(segundos));

  if (timer === true) {
    startCountDown(--duration, element);
  } else {
    stopCountDown(activity);
  }
} //Devuelvo valor rellenado. Ejemplo: 1 minuto 2 segundos = 01 minutos 02 segundos


function paddedFormat(num) {
  return num < 10 ? "0" + num : num;
} //Con esta funcion empiezo la cuenta regresiva


function startCountDown(duration, element) {
  timer = false;
  var secondsRemaining = duration;
  min = 0;
  sec = 0;
  countInterval = setInterval(function () {
    min = parseInt(secondsRemaining / 60);
    sec = parseInt(secondsRemaining % 60);
    element.textContent = "".concat(paddedFormat(min), ":").concat(paddedFormat(sec));
    secondsRemaining = secondsRemaining - 1;

    if (secondsRemaining < 20) {
      element.style.color = 'red';
    }

    ;

    if (secondsRemaining < 0) {
      clearInterval(countInterval);
    }

    ;
  }, 1000);
}

function stopCountDown(activity) {
  return regeneratorRuntime.async(function stopCountDown$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          timer = true;
          clearInterval(countInterval);
          _context.next = 4;
          return regeneratorRuntime.awrap(axios.post("/activity/setActivity", {
            activity: activity,
            min: min,
            sec: sec
          }));

        case 4:
          renderActivities();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderActivities() {
  var infoActivities, root, html, activities;
  return regeneratorRuntime.async(function renderActivities$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.get("/activity/infoActivity"));

        case 3:
          infoActivities = _context2.sent;
          root = document.querySelector('#root');
          html = "";
          activities = infoActivities.data.allActivities.activities;
          activities.forEach(function (activity) {
            html += " <div>\n                    <p>".concat(activity.activity, "</p>\n                    <p>").concat(activity.minutes, ":</p>\n                    <p>").concat(activity.seconds, "</p>\n                    </div>");
          });
          root.innerHTML = html;
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

function disabledButtons(event) {//ACA HAY QUE DESABILITAR LOS OTROS BOTONES QUE NO SE TOCARON!
}