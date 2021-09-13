//Render all the clients
async function renderClients() {
    try {
        const rootProjectsDate = document.querySelector("#rootProjectsDate");
        if (!rootProjectsDate) throw new Error("There is a problem finding the HTML to show the clients");

        const clientsInfo = await axios.get(`/clients/getAllClients`);
        const { infoClients: clients } = clientsInfo.data;
        const sortedClients = clients.sort(function (x, y) {
            return x.lastDesignDate._seconds - y.lastDesignDate._seconds;
        })

        let html = sortedClients.map((element) => {
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
                                    <p id="dateOfDesign${element.id}">${designDate}</p>
                                </div>
                
                                <div class="projectDate__image__call">
                                    <img src="img/call.png" alt="">
                                    <p id="dateOfCall${element.id}">${callDate}</p>
                                 </div>
                       </div>
                </div>
               
              
               `;
        }).join("");

        rootProjectsDate.innerHTML = html;

        verifyLastActivity(sortedClients);
    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
}

function formatDate(lastDate) {
    try {
        if (lastDate) {
            if (typeof lastDate === 'object') {
                lastDate = moment.unix(lastDate._seconds).format('DD.MM');
            } else if (typeof lastDate === 'string') {
                lastDate = moment(lastDate).format('DD.MM');
            }
        } else {
            lastDate = 'No yet'
        }
        return lastDate;
    } catch (error) {
        console.error(error);
    }
}

//Function to verify when was the last activity, if it was more than a month the activity will be red
function verifyLastActivity(sortedClients) {
    try {
        const oneMonthAgo = moment().subtract(1, 'months').unix()

        sortedClients.map((element) => {
            const designText = document.getElementById(`dateOfDesign${element.id}`)
            const callText = document.getElementById(`dateOfCall${element.id}`)
            
            if (element.lastDesignDate._seconds < oneMonthAgo) {
                designText.style.color = "red";
            } else {
                designText.style.color = "#41475e";
            }

            if (element.lastCallDate._seconds < oneMonthAgo) {
                callText.style.color = "red";
            } else {
                callText.style.color = "#41475e";
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};