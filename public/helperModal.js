// Get the modal
const modalUpload = document.getElementById("modalCreate");
const modalCreateProject = document.getElementById("modalCreateProject");
const modalCreateClient = document.getElementById("modalCreateClient");
const modalEdit = document.getElementById("modalEdit");
const modalDescription = document.getElementById("modalDescription");
const modalClient = document.getElementById("modalClient");
const modalProject = document.getElementById("modalProject");
const modalSetting = document.getElementById("modalSetting");

// Get the button that opens the modal
const buttonUpload = document.getElementById("buttonCreate");
const buttonUpload1 = document.getElementById("buttonCreate1");
const buttonClient = document.getElementById("buttonModalClient");
const buttonProject = document.getElementById("buttonModalProject");
const buttonSetting = document.getElementById("buttonModalSetting");
const buttonCreateProject = document.getElementById("buttonModalCreateProject");
const buttonCreateClient = document.getElementById("buttonModalCreateClient");

// Get the <span> element that closes the modal
const closeUpload = document.getElementById("closeModal");
const closeEdit = document.getElementById("closeEdit");
const closeDescription = document.getElementById("closeDescription");
const closeClient = document.getElementById("closeClient");
const closeProject = document.getElementById("closeProject");
const closeSetting = document.getElementById("closeSetting");
const closeCreateProject = document.getElementById("closeCreateProject");
const closeCreateClient = document.getElementById("closeCreateClient");

//*Columns
const columnOne = document.querySelector(".column1");
const columnTwo = document.querySelector(".column2");
const columnThree = document.querySelector(".column3");
const columnFour = document.querySelector(".column4");

// When the user clicks the button, open the modal
buttonUpload.addEventListener("click", openModal);

if (buttonUpload1) {
  buttonUpload1.addEventListener("click", openModal);
}

function openModal() {
  try {
    modalUpload.style.display = "block";
    modalUpload.classList.add("showModal");
  } catch (error) {
    console.error(error);
  }
}

if (buttonClient) {
  buttonClient.addEventListener("click", openModalClient);
  function openModalClient() {
    try {
      modalClient.style.display = "block";
      modalClient.classList.add("showModal");
    } catch (error) {
      console.error(error);
    }
  }
}

buttonProject.addEventListener("click", openModalProject);

function openModalProject() {
  try {
    modalProject.style.display = "block";
    
  } catch (error) {
    console.error(error);
  }
}

if (buttonSetting) {
  buttonSetting.addEventListener("click", openModalSetting);
  function openModalSetting() {
    try {
      modalSetting.style.display = "block";
      modalSetting.classList.add("showModal");
    } catch (error) {
      console.error(error);
    }
  }
}

if (buttonCreateProject) {
    buttonCreateProject.addEventListener('click', openModalCreateProject);
    function openModalCreateProject() {
        try {
            modalCreateProject.style.display = "block";
            modalCreateProject.classList.add("showModal");
        } catch (error) {
            console.error(error);
        };
    }
};

if (buttonCreateClient) {
    buttonCreateClient.addEventListener('click', openModalCreateClient);
    function openModalCreateClient() {
        try {
            modalCreateClient.style.display = "block";
            modalCreateClient.classList.add("showModal");
        } catch (error) {
            console.error(error);
        };
    }
};

// When the user clicks on <span> (x), close the modal
closeUpload.addEventListener("click", closeModal);

if (closeDescription) {
  closeDescription.addEventListener("click", closeModalDescription);
}

if (closeClient) {
  closeClient.addEventListener("click", closeModalClient);
}

if (closeProject) {
  closeProject.addEventListener("click", closeModalProject);
}

if (closeSetting) {
  closeSetting.addEventListener("click", closeModalSetting);
}

if (closeCreateProject) {
    closeCreateProject.addEventListener('click', closeModalCreateProject);
}

if (closeCreateClient) {
    closeCreateClient.addEventListener('click', closeModalCreateClient);
}

closeEdit.addEventListener('click', closeModalEdit);

function closeModal() {
  try {
    modalUpload.style.display = "none";
  } catch (error) {
    console.error(error);
  }
}

function closeModalDescription() {
  try {
    modalDescription.style.display = "none";
  } catch (error) {
    console.error(error);
  }
}

function closeModalClient() {
  try {
    modalClient.style.display = "none";
  } catch (error) {
    console.error(error);
  }
}

function closeModalProject() {
  try {
    modalProject.style.display = "none";

  
  } catch (error) {
    console.error(error);
  }
}

function closeModalEdit() {
  try {
    modalEdit.style.display = "none";
  } catch (error) {
    console.error(error);
  }
}

function closeModalSetting() {
    try {
        modalSetting.style.display = "none";
    } catch (error) {
        console.error(error);
    };
};

function closeModalCreateProject() {
    try {
        modalCreateProject.style.display = "none";
    } catch (error) {
        console.error(error);
    };
};

function closeModalCreateClient() {
    try {
        modalCreateClient.style.display = "none";
    } catch (error) {
        console.error(error);
    };
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    try {
        if (event.target === modalUpload || event.target === modalEdit || event.target === modalDescription || event.target === modalClient || event.target === modalProject || event.target === modalSetting || event.target === modalCreateProject || event.target === modalCreateClient) {
            modalUpload.style.display = "none";
            modalDescription.style.display = "none";
            modalEdit.style.display = "none";
            modalClient.style.display = "none";
            modalProject.style.display = "none";
            modalSetting.style.display = "none";
            modalCreateProject.style.display = "none";
            modalCreateClient.style.display = "none";
        }s
    } catch (error) {
        console.error(error);
    };
};
