export { };

//This is to iniitializate Firebase
const admin = require('firebase-admin');
const db = admin.firestore();

const settingsDb = db.collection('settings');

export async function getGeneralTimeInformation(req, res) {
    try {
        let infoSettings = [];
        const allSettings = db.collection('settings');
        const settings = await allSettings.get();
        settings.forEach(doc => {
            infoSettings.push(doc.data())
        });
        res.send({ message: "Information of general settings", infoSettings })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function editGeneralSettings(req, res) {
    try {
        const { timeRecreation, timeEat, timeCall } = req.body;

        await db.collection('settings').doc('BIYy1NPNRZEuCRuhcHTL').set({
            generalTimeRecreation: timeRecreation,
            generalTimeEat: timeEat,
            generalTimeCall: timeCall,
        }, { merge: true });
        res.send({ message: "The general settings were updated" })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}