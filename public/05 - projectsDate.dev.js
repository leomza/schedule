"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//Render all the clients
function renderClients() {
  var rootProjectsDate, clientsInfo, clients, sortedClients, html;
  return regeneratorRuntime.async(function renderClients$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          rootProjectsDate = document.querySelector("#rootProjectsDate");

          if (rootProjectsDate) {
            _context.next = 4;
            break;
          }

          throw new Error("There is a problem finding the HTML to show the clients");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.get("/clients/getAllClients"));

        case 6:
          clientsInfo = _context.sent;
          clients = clientsInfo.data.infoClients;
          sortedClients = clients.sort(function (x, y) {
            return x.lastDesignDate._seconds - y.lastDesignDate._seconds;
          });
          html = sortedClients.map(function (element) {
            var callDate = formatDate(element.lastCallDate);
            var designDate = formatDate(element.lastDesignDate);
            return " \n                <div class=\"projectDate-container\">\n            \n                        <div class=\"projectDate__name\">\n                            <p>".concat(element.clientname, "</p>\n                            \n                        </div>\n                        <div class=\"projectDate__image\">\n                                 <div class=\"projectDate__image__design\">\n                           <img src=\"./img/Group 655.png\" alt=\"\">\n                                    <p id=\"dateOfDesign").concat(element.id, "\">").concat(designDate, "</p>\n                                </div>\n                \n                                <div class=\"projectDate__image__call\">\n                                    <img src=\"img/call.png\" alt=\"\">\n                                    <p id=\"dateOfCall").concat(element.id, "\">").concat(callDate, "</p>\n                                 </div>\n                       </div>\n                </div>\n               \n              \n               ");
          }).join("");
          rootProjectsDate.innerHTML = html;
          verifyLastActivity(sortedClients);
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          swal("Ohhh no!", _context.t0.response.data, "warning");
          console.error(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function formatDate(lastDate) {
  try {
    if (lastDate) {
      if (_typeof(lastDate) === 'object') {
        lastDate = moment.unix(lastDate._seconds).format('DD.MM');
      } else if (typeof lastDate === 'string') {
        lastDate = moment(lastDate).format('DD.MM');
      }
    } else {
      lastDate = 'No yet';
    }

    return lastDate;
  } catch (error) {
    console.error(error);
  }
} //Function to verify when was the last activity, if it was more than a month the activity will be red


function verifyLastActivity(sortedClients) {
  try {
    var oneMonthAgo = moment().subtract(1, 'months').unix();
    sortedClients.map(function (element) {
      var designText = document.getElementById("dateOfDesign".concat(element.id));
      var callText = document.getElementById("dateOfCall".concat(element.id));

      if (element.lastDesignDate._seconds < oneMonthAgo) {
        designText.style.color = "red";
      } else {
        designText.style.color = "#41475e";
      }

      if (element.lastCallDate._seconds < oneMonthAgo) {
        callText.style.color = "red";
      } else {
        callText.style.color = "#41475e";
      }
    });
  } catch (error) {
    console.error(error);
  }
}

;