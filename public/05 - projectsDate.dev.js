"use strict";

//Render all the clients
function renderClients() {
  var rootProjectsDate, clientsInfo, clients, html;
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
          html = clients.map(function (element) {
            var callDate = formatDate(element.lastCallDate);
            var designDate = formatDate(element.lastDesignDate);
            return " \n                <div class=\"projectDate-container\">\n            \n                        <div class=\"projectDate__name\">\n                            <p>".concat(element.clientname, "</p>\n                            \n                        </div>\n                        <div class=\"projectDate__image\">\n                                 <div class=\"projectDate__image__design\">\n                                 <img src=\"./img/Group BBB(2).png\" alt=\"\">\n                                    <p>").concat(designDate, "</p>\n                                </div>\n                \n                                <div class=\"projectDate__image__call\">\n                                    <img src=\"img/call.png\" alt=\"\">\n                                    <p>").concat(callDate, "</p>\n                                 </div>\n                       </div>\n                </div>\n               \n              \n               ");
          }).join("");
          rootProjectsDate.innerHTML = html;
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          swal("Ohhh no!", _context.t0.response.data, "warning");
          console.error(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function formatDate(lastDate) {
  try {
    if (lastDate) {
      lastDate = moment(lastDate).format('DD.MM');
    } else {
      lastDate = 'No yet';
    }

    return lastDate;
  } catch (error) {
    console.error(error);
  }
}