//Render all the clients
async function renderClients() {
    try {
        const rootProjectsDate = document.querySelector("#rootProjectsDate");
        if (!rootProjectsDate) throw new Error("There is a problem finding the HTML to show the clients");

        const clientsInfo = await axios.get(`/clients/getAllClients`);
        const { infoClients: clients } = clientsInfo.data;

        let html = clients
            .map((element) => {
                const callDate = formatDate(element.lastCallDate);
                const designDate = formatDate(element.lastDesignDate);
                return ` 
                <div class="projectDate-container">
            
                        <div class="projectDate__name">
                            <p>${element.clientname}</p>
                            
                        </div>
                        <div class="projectDate__image">
                                 <div class="projectDate__image__design">
                           <img src="./img/Group 655.png" alt="">
                                    <p>${designDate}</p>
                                </div>
                
                                <div class="projectDate__image__call">
                                    <img src="img/call.png" alt="">
                                    <p>${callDate}</p>
                                 </div>
                       </div>
                </div>
               
              
               `;
            })
            .join("");

        rootProjectsDate.innerHTML = html;
    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
}

function formatDate(lastDate) {
    try {
        if (lastDate) {
            lastDate = moment(lastDate).format('DD.MM');
        } else {
            lastDate = 'No yet'
        }
        return lastDate;
    } catch (error) {
        console.error(error);
    }
}