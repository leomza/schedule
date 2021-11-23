const firebaseConfig = {
  apiKey: "AIzaSyDA9A7vo3uMjiftDYkiDkjQUDSU2tw0D-8",
  authDomain: "schedule-51dfa.firebaseapp.com",
  databaseURL: "https://schedule-51dfa-default-rtdb.firebaseio.com",
  projectId: "schedule-51dfa",
  storageBucket: "schedule-51dfa.appspot.com",
  messagingSenderId: "972592239738",
  appId: "1:972592239738:web:ed2f675ff750770c7e57c3",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

//Create a variable to set the selected project
let projectSelected;

//Function to get the names of the projects in the "select Project Name"
async function getProjectNames() {
  try {
    const projectsInfo = await axios.get(`/projects/getAllprojects`);
    const { infoProjects: projects } = projectsInfo.data;
    const select = document.getElementById("selectProjectName");

    for (let index = 0; index < projects.length; index++) {
      const option = document.createElement("option");
      option.value = projects[index].projectUuid;
      option.innerHTML = projects[index].projectName;
      select.appendChild(option);
    }
  } catch (error) {
    console.error(error);
  }
}

//Function to show information of the chat of the project
function changeProjectOption() {
  const select = document.getElementById("selectProjectName");
  projectSelected = select.value;
  showChat();
}

//Handle the form to send a new message:
const handleFormMessage = document.querySelector("#send_message");
handleFormMessage.addEventListener("submit", postChat);

function postChat(ev) {
  ev.preventDefault();
  const timestamp = Date.now();
  let { chatTxt } = ev.target.elements;
  chatTxt = chatTxt.value;

  db.ref(`${projectSelected}/${timestamp}`).set({
    usr: 'Usuario',
    date: Date.now(),
    msg: chatTxt,
  });
  ev.target.reset();
  showChat();
}

//Show information of the chat in the DOM
function showChat() {
  //Clear the container first to dont'repeat messages
  document.getElementById("messages").innerHTML = "";

  const fetchChat = db.ref(`${projectSelected}/`);
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    let time = moment(messages.date).format('MMMM Do YYYY, h:mm:ss a');
    const msg = `<p> ${messages.usr} :  ${messages.msg} , ${time} </p>`;
    document.getElementById("messages").innerHTML += msg;
  });
}
