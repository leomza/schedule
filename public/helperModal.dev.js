"use strict";

// Get the modal
var modalUpload = document.getElementById("modalCreate");
var modalCreateProject = document.getElementById("modalCreateProject");
var modalCreateClient = document.getElementById("modalCreateClient");
var modalEdit = document.getElementById("modalEdit");
var modalDescription = document.getElementById("modalDescription");
var modalClient = document.getElementById("modalClient");
var modalProject = document.getElementById("modalProject");
var modalSetting = document.getElementById("modalSetting"); // Get the button that opens the modal

var buttonUpload = document.getElementById("buttonCreate");
var buttonUpload1 = document.getElementById("buttonCreate1");
var buttonClient = document.getElementById("buttonModalClient");
var buttonProject = document.getElementById("buttonModalProject");
var buttonSetting = document.getElementById("buttonModalSetting");
var buttonCreateProject = document.getElementById("buttonModalCreateProject");
var buttonCreateClient = document.getElementById("buttonModalCreateClient"); // Get the <span> element that closes the modal

var closeUpload = document.getElementById("closeModal");
var closeEdit = document.getElementById("closeEdit");
var closeDescription = document.getElementById("closeDescription");
var closeClient = document.getElementById("closeClient");
var closeProject = document.getElementById("closeProject");
var closeSetting = document.getElementById("closeSetting");
var closeCreateProject = document.getElementById("closeCreateProject");
var closeCreateClient = document.getElementById("closeCreateClient"); // When the user clicks the button, open the modal

buttonUpload.addEventListener('click', openModal);

if (buttonUpload1) {
  buttonUpload1.addEventListener('click', openModal);
}

function openModal() {
  try {
    modalUpload.style.display = "block";
    modalUpload.classList.add("showModal");
  } catch (error) {
    console.error(error);
  }

  ;
}

;

if (buttonClient) {
  var openModalClient = function openModalClient() {
    try {
      modalClient.style.display = "block";
      modalClient.classList.add("showModal");
    } catch (error) {
      console.error(error);
    }

    ;
  };

  buttonClient.addEventListener('click', openModalClient);
}

;

if (buttonProject) {
  var openModalProject = function openModalProject() {
    try {
      modalProject.style.display = "block";
      modalProject.classList.add("showModal");
    } catch (error) {
      console.error(error);
    }

    ;
  };

  buttonProject.addEventListener('click', openModalProject);
}

;

if (buttonSetting) {
  var openModalSetting = function openModalSetting() {
    try {
      modalSetting.style.display = "block";
      modalSetting.classList.add("showModal");
    } catch (error) {
      console.error(error);
    }

    ;
  };

  buttonSetting.addEventListener('click', openModalSetting);
}

;

if (buttonCreateProject) {
  var openModalCreateProject = function openModalCreateProject() {
    try {
      modalCreateProject.style.display = "block";
      modalCreateProject.classList.add("showModal");
    } catch (error) {
      console.error(error);
    }

    ;
  };

  buttonCreateProject.addEventListener('click', openModalCreateProject);
}

;

if (buttonCreateClient) {
  var openModalCreateClient = function openModalCreateClient() {
    try {
      modalCreateClient.style.display = "block";
      modalCreateClient.classList.add("showModal");
    } catch (error) {
      console.error(error);
    }

    ;
  };

  buttonCreateClient.addEventListener('click', openModalCreateClient);
}

; // When the user clicks on <span> (x), close the modal

closeUpload.addEventListener('click', closeModal);

if (closeDescription) {
  closeDescription.addEventListener('click', closeModalDescription);
}

if (closeClient) {
  closeClient.addEventListener('click', closeModalClient);
}

if (closeProject) {
  closeProject.addEventListener('click', closeModalProject);
}

if (closeSetting) {
  closeSetting.addEventListener('click', closeModalSetting);
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

  ;
}

;

function closeModalDescription() {
  try {
    modalDescription.style.display = "none";
  } catch (error) {
    console.error(error);
  }

  ;
}

;

function closeModalClient() {
  try {
    modalClient.style.display = "none";
  } catch (error) {
    console.error(error);
  }

  ;
}

;

function closeModalProject() {
  try {
    modalProject.style.display = "none";
  } catch (error) {
    console.error(error);
  }

  ;
}

;

function closeModalEdit() {
  try {
    modalEdit.style.display = "none";
  } catch (error) {
    console.error(error);
  }

  ;
}

;

function closeModalSetting() {
  try {
    modalSetting.style.display = "none";
  } catch (error) {
    console.error(error);
  }

  ;
}

;

function closeModalCreateProject() {
  try {
    modalCreateProject.style.display = "none";
  } catch (error) {
    console.error(error);
  }

  ;
}

;

function closeModalCreateClient() {
  try {
    modalCreateClient.style.display = "none";
  } catch (error) {
    console.error(error);
  }

  ;
}

; // When the user clicks anywhere outside of the modal, close it

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
    }
  } catch (error) {
    console.error(error);
  }

  ;
};