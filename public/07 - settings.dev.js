"use strict";

//Set the information inside the Settings Modal
function editSettings() {
  var generalSettings, generalTime, infoSettings, html;
  return regeneratorRuntime.async(function editSettings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (modalSetting) {
            _context.next = 3;
            break;
          }

          throw new Error("There is a problem finding the modal in the HTML");

        case 3:
          generalSettings = document.getElementById('generalSettings');

          if (generalSettings) {
            _context.next = 6;
            break;
          }

          throw new Error("There is a problem finding form from HTML");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(axios.get("settings/getGeneralTimeInformation"));

        case 8:
          generalTime = _context.sent;
          infoSettings = generalTime.data.infoSettings;
          html = "\n                    <div>\n                    <h3>Edit General Settings</h3>\n\n                    <div class=\"form__wrapper\">\n                        <label for=\"timeRecreation\">Recreation time (in minutes):</label>\n                        <input type=\"text\" name=\"timeRecreation\" value=\"".concat(infoSettings[0].generalTimeRecreation, "\" placeholder=\"Recreation time\" required>\n                    </div>\n                    \n                    <div class=\"form__wrapper\">\n                        <label for=\"timeEat\">Eat time (in minutes):</label>\n                        <input type=\"text\" name=\"timeEat\" value=\"").concat(infoSettings[0].generalTimeEat, "\" placeholder=\"Eat time\" required>\n                    </div>\n\n                    <div class=\"form__wrapper\">\n                        <label for=\"timeCall\">Call time (in minutes):</label>\n                        <input type=\"text\" name=\"timeCall\" value=\"").concat(infoSettings[0].generalTimeCall, "\" placeholder=\"Call time\" required>\n                    </div>\n\n                    <input type=\"submit\" value=\"Update settings\" class=\"button-form\">\n                    </div>\n                    ");
          generalSettings.innerHTML = html;
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function handleSettings(ev) {
  var _ev$target$elements, timeRecreation, timeEat, timeCall, settingDetails;

  return regeneratorRuntime.async(function handleSettings$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _ev$target$elements = ev.target.elements, timeRecreation = _ev$target$elements.timeRecreation, timeEat = _ev$target$elements.timeEat, timeCall = _ev$target$elements.timeCall;
          timeRecreation = timeRecreation.value;
          timeEat = timeEat.value;
          timeCall = timeCall.value;

          if (!(!timeRecreation || !timeEat || !timeCall)) {
            _context2.next = 7;
            break;
          }

          throw new Error("You need to complete all the fields");

        case 7:
          if (modalSetting) {
            _context2.next = 9;
            break;
          }

          throw new Error("There is a problem finding modalSetting from HTML");

        case 9:
          modalSetting.style.display = "none";
          ev.target.reset();
          settingDetails = {
            timeRecreation: timeRecreation,
            timeEat: timeEat,
            timeCall: timeCall
          };
          _context2.next = 14;
          return regeneratorRuntime.awrap(axios.put("/settings/editGeneralSettings", settingDetails));

        case 14:
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          swal("Ohhh no!", "".concat(_context2.t0), "warning");
          console.error(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}