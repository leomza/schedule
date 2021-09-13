// Get the modal
const modalUpload = document.getElementById("modalCreate");
const modalEdit = document.getElementById("modalEdit");
const modalDescription = document.getElementById("modalDescription");

// Get the button that opens the modal
const buttonUpload = document.getElementById("buttonCreate");
const buttonUpload1 = document.getElementById("buttonCreate1");

// Get the <span> element that closes the modal
const closeUpload = document.getElementById("closeModal");
const closeEdit = document.getElementById("closeEdit");
const closeDescription = document.getElementById("closeDescription");

// When the user clicks the button, open the modal
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
    };
};

// When the user clicks on <span> (x), close the modal
closeUpload.addEventListener('click', closeModal);
closeDescription.addEventListener('click', closeModalDescription);
closeEdit.addEventListener('click', closeModalEdit);

function closeModal() {
    try {
        modalUpload.style.display = "none";
    } catch (error) {
        console.error(error);
    };
};

function closeModalDescription() {
    try {
        modalDescription.style.display = "none";
    } catch (error) {
        console.error(error);
    };
};

function closeModalEdit() {
    try {
        modalEdit.style.display = "none";
    } catch (error) {
        console.error(error);
    };
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    try {
        if (event.target === modalUpload || event.target === modalEdit || event.target === modalDescription) {
            modalUpload.style.display = "none";
            modalDescription.style.display = "none";
            modalEdit.style.display = "none";
        }
    } catch (error) {
        console.error(error);
    };
};