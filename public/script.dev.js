"use strict";

//Handle the form to login an existing user:
var handleFormCreate = document.querySelector("#loginUser");
handleFormCreate.addEventListener('submit', doingSubmitLogin);

function doingSubmitLogin(ev) {
  var _ev$target$elements, email, password, userDetails, userLogin;

  return regeneratorRuntime.async(function doingSubmitLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          ev.preventDefault();
          _ev$target$elements = ev.target.elements, email = _ev$target$elements.email, password = _ev$target$elements.password;
          email = email.value;
          password = password.value;

          if (!(!email || !password)) {
            _context.next = 7;
            break;
          }

          throw new Error("Please complete all the fields");

        case 7:
          ev.target.reset();
          userDetails = {
            email: email,
            password: password
          };
          _context.next = 11;
          return regeneratorRuntime.awrap(axios.post('/users/login', userDetails));

        case 11:
          userLogin = _context.sent;
          location.href = "03 - tasks.html";
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          swal("Ohhh no!", _context.t0.response.data, "warning");
          console.error(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}