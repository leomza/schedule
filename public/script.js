//Handle the form to login an existing user:
const handleFormCreate = document.querySelector("#loginUser");
handleFormCreate.addEventListener('submit', doingSubmitLogin);

async function doingSubmitLogin(ev) {
    try {
        ev.preventDefault();
        let { email, password } = ev.target.elements
        email = email.value;
        password = password.value;
        if ((!email) || (!password)) throw new Error("Please complete all the fields");
        ev.target.reset();
        const userDetails = { email, password }
        const userLogin = await axios.post('/users/login', userDetails);
        location.href = `03 - tasks.html`;
    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
}