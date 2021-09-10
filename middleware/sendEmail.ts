export { }

require('dotenv').config();

//Require the package
const nodemailer = require('nodemailer');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//EMAIL
export function sendEmail(req, res, next) {
    try {
        const { typeButton } = req.params;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'storeargento4@gmail.com',
                pass: 'Store123'
            }
        });

        let message;
        if (typeButton == 'call') {
            message = `<div>
            <h1>Warning!</h1>
            <p><b>THE TIMER IS RUNNING, YOU HAVE BEEN OUT FOR MORE THAN AN HOUR AND A HALF</b></p>
            </div>`;
        } else {
            message = `<div>
            <h1>Warning!</h1>
            <p><b>THE TIMER IS RUNNING, YOU HAVE BEEN ON A CALL FOR MORE THAN ONE HOUR</b></p>
            </div>`;
        }

        const mailOptions = {
            from: 'Schedule App',
            to: 'storeargento4@gmail.com',
            subject: 'Warning for the Schedule App',
            html: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                console.log('Email sended: ' + info.response);
                return;
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

//WHATSAPP
export function sendWhatsApp(req, res, next) {
    try {
        const { typeButton } = req.params;

        client.messages.create({
            from: 'whatsapp:+14155238886',
            body: `The timer is running, you have been in ${typeButton} for a long time!!`,
            to: 'whatsapp:+5492616736217' //Number that I want to notify
        }).then(message => {
            console.log('WhatsApp sended: ' + message.sid)
            return;
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}