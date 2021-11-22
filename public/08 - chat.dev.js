"use strict";

var firebaseConfig = {
  apiKey: "AIzaSyDA9A7vo3uMjiftDYkiDkjQUDSU2tw0D-8",
  authDomain: "schedule-51dfa.firebaseapp.com",
  databaseURL: "https://schedule-51dfa-default-rtdb.firebaseio.com",
  projectId: "schedule-51dfa",
  storageBucket: "schedule-51dfa.appspot.com",
  messagingSenderId: "972592239738",
  appId: "1:972592239738:web:ed2f675ff750770c7e57c3"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database(); //Create a variable to set the selected project

var projectSelected; //Function to get the names of the projects in the "select Project Name"

function getProjectNames() {
  var projectsInfo, projects, select, index, option;
  return regeneratorRuntime.async(function getProjectNames$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get("/projects/getAllprojects"));

        case 3:
          projectsInfo = _context.sent;
          projects = projectsInfo.data.infoProjects;
          select = document.getElementById("selectProjectName");

          for (index = 0; index < projects.length; index++) {
            option = document.createElement("option");
            option.value = projects[index].projectUuid;
            option.innerHTML = projects[index].projectName;
            select.appendChild(option);
          }

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
} //Function to show information of the chat of the project


function changeProjectOption() {
  var select = document.getElementById("selectProjectName");
  projectSelected = select.value;
  showChat();
} //Handle the form to send a new message:


var handleFormMessage = document.querySelector("#send_message");
handleFormMessage.addEventListener("submit", postChat);

function postChat(ev) {
  ev.preventDefault();
  var timestamp = Date.now();
  var chatTxt = ev.target.elements.chatTxt;
  chatTxt = chatTxt.value;
  db.ref("".concat(projectSelected, "/").concat(timestamp)).set({
    usr: 'Usuario',
    date: Date.now(),
    msg: chatTxt
  });
  ev.target.reset();
  showChat();
} //Show information of the chat in the DOM


function showChat() {
  //Clear the container first to dont'repeat messages
  document.getElementById("messages").innerHTML = "";
  var fetchChat = db.ref("".concat(projectSelected, "/"));
  fetchChat.on("child_added", function (snapshot) {
    var messages = snapshot.val();
    var time = moment(messages.date).format('MMMM Do YYYY, h:mm:ss a');
    var msg = "<p> ".concat(messages.usr, " :  ").concat(messages.msg, " , ").concat(time, " </p>");
    document.getElementById("messages").innerHTML += msg;
  });
}