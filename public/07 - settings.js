//Set the information inside the Settings Modal
async function editSettings() {
    try {
        if (!modalSetting)
            throw new Error("There is a problem finding the modal in the HTML");
        const generalSettings = document.getElementById('generalSettings');
        if (!generalSettings) throw new Error("There is a problem finding form from HTML");
        const generalTime = await axios.get(`settings/getGeneralTimeInformation`);
        const { infoSettings } = generalTime.data;

        let html = `
                    <div>
                    <h3>Edit General Settings</h3>

                    <div class="form__wrapper">
                        <label for="timeRecreation">Recreation time (in minutes):</label>
                        <input type="text" name="timeRecreation" value="${infoSettings[0].generalTimeRecreation}" placeholder="Recreation time" required>
                    </div>
                    
                    <div class="form__wrapper">
                        <label for="timeEat">Eat time (in minutes):</label>
                        <input type="text" name="timeEat" value="${infoSettings[0].generalTimeEat}" placeholder="Eat time" required>
                    </div>

                    <div class="form__wrapper">
                        <label for="timeCall">Call time (in minutes):</label>
                        <input type="text" name="timeCall" value="${infoSettings[0].generalTimeCall}" placeholder="Call time" required>
                    </div>

                    <div class="form__wrapper">
                        <label for="color">Background color:</label>
                        <input type="color" name="color" id="color" value="#FFFFFF">
                    </div>


                    <input type="submit" value="Update settings" class="button-form">
                    </div>
                    `
        generalSettings.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

async function handleSettings(ev) {
    try {
        let { timeRecreation, timeEat, timeCall, color } = ev.target.elements;
        timeRecreation = timeRecreation.value;
        timeEat = timeEat.value;
        timeCall = timeCall.value;
        color = color.value;

        localStorage.setItem('backgroundColor', color);

        if (!timeRecreation || !timeEat || !timeCall)
            throw new Error("You need to complete all the fields");

        if (!modalSetting)
            throw new Error("There is a problem finding modalSetting from HTML");
        modalSetting.style.display = "none";
        ev.target.reset();
        const settingDetails = { timeRecreation, timeEat, timeCall };

        await axios.put(`/settings/editGeneralSettings`, settingDetails);
    } catch (error) {
        swal("Ohhh no!", `${error}`, "warning");
        console.error(error);
    }
}

function setColor() {
    try {
        const color = localStorage.getItem('backgroundColor');
        document.body.style.backgroundColor = `${color}`;
    } catch (error) {
        console.error(error);
    }
}