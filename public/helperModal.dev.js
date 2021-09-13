"use strict";

// Get the modal
var modalUpload = document.getElementById("modalCreate");
var modalEdit = document.getElementById("modalEdit");
var modalDescription = document.getElementById("modalDescription"); // Get the button that opens the modal

var buttonUpload = document.getElementById("buttonCreate");
var buttonUpload1 = document.getElementById("buttonCreate1"); // Get the <span> element that closes the modal

var closeUpload = document.getElementById("closeModal");
var closeEdit = document.getElementById("closeEdit");
var closeDescription = document.getElementById("closeDescription"); // When the user clicks the button, open the modal

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

; // When the user clicks on <span> (x), close the modal

closeUpload.addEventListener('click', closeModal);
closeDescription.addEventListener('click', closeModalDescription);
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
    if (event.target === modalUpload || event.target === modalEdit || event.target === modalDescription) {
      modalUpload.style.display = "none";
      modalDescription.style.display = "none";
      modalEdit.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }

  ;
};