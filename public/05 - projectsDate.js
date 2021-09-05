//Render all the clients
async function renderClients() {
    try {
        const rootProjectsDate = document.querySelector("#rootProjectsDate");
        if (!rootProjectsDate) throw new Error("There is a problem finding the HTML to show the clients");

        const clientsInfo = await axios.get(`/clients/getAllClients`);
        const { clients } = clientsInfo.data.allClients;

        let html = clients
            .map((element) => {
                const callDate = formatDate(element.lastCallDate);
                const designDate = formatDate(element.lastDesignDate);
                return `<div>
              <div>
                <p>${element.clientname}</p>
                <div>
                    <div>
                        <img src="img/design.png" alt="">
                        <p>${designDate}</p>
                    </div>

                    <div>
                        <img src="img/call.png" alt="">
                        <p>${callDate}</p>
                    </div>
                </div>
              </div>
              </div>`;
            })
            .join("");

        rootProjectsDate.innerHTML = html;
    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
}

/* function formatDate(lastDate) {
    try {
        lastDate.toLocaleString('en-US')
        console.log(lastDate.toLocaleString('en-US'));
        var dd = String(lastDate.getDate()).padStart(2, '0');
        var mm = String(lastDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = lastDate.getFullYear();

        lastDate = mm + '/' + dd + '/' + yyyy;
        console.log(lastDate);
        return lastDate;
    } catch (error) {
        console.error(error);
    }
} */
