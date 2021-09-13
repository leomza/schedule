"use strict";

// Get the modal
var modalUpload = document.getElementById("modalCreate");
var modalEdit = document.getElementById("modalEdit");
var modalDescription = document.getElementById("modalDescription");
var modalClient = document.getElementById("modalClient");
var modalProject = document.getElementById("modalProject"); // Get the button that opens the modal

var buttonUpload = document.getElementById("buttonCreate");
var buttonUpload1 = document.getElementById("buttonCreate1");
var buttonClient = document.getElementById("buttonModalClient");
var buttonProject = document.getElementById("buttonModalProject"); // Get the <span> element that closes the modal

var closeUpload = document.getElementById("closeModal");
var closeEdit = document.getElementById("closeEdit");
var closeDescription = document.getElementById("closeDescription");
var closeClient = document.getElementById("closeClient");
var closeProject = document.getElementById("closeProject"); // When the user clicks the button, open the modal

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

; // When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
  try {
    if (event.target === modalUpload || event.target === modalEdit || event.target === modalDescription || event.target === modalClient || event.target === modalProject) {
      modalUpload.style.display = "none";
      modalDescription.style.display = "none";
      modalEdit.style.display = "none";
      modalClient.style.display = "none";
      modalProject.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }

  ;
};