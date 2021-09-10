"use strict";
exports.__esModule = true;
exports.sendWhatsApp = exports.sendEmail = void 0;
require('dotenv').config();
//Require the package
var nodemailer = require('nodemailer');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
//EMAIL
function sendEmail(req, res, next) {
    try {
        var typeButton = req.params.typeButton;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'storeargento4@gmail.com',
                pass: 'Store123'
            }
        });
        var message = void 0;
        if (typeButton == 'call') {
            message = "<div>\n            <h1>Warning!</h1>\n            <p><b>THE TIMER IS RUNNING, YOU HAVE BEEN OUT FOR MORE THAN AN HOUR AND A HALF</b></p>\n            </div>";
        }
        else {
            message = "<div>\n            <h1>Warning!</h1>\n            <p><b>THE TIMER IS RUNNING, YOU HAVE BEEN ON A CALL FOR MORE THAN ONE HOUR</b></p>\n            </div>";
        }
        var mailOptions = {
            from: 'Schedule App',
            to: 'storeargento4@gmail.com',
            subject: 'Warning for the Schedule App',
            html: message
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(500).send(error.message);
            }
            else {
                console.log('Email sended: ' + info.response);
                return;
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.sendEmail = sendEmail;
//WHATSAPP
function sendWhatsApp(req, res, next) {
    try {
        var typeButton = req.params.typeButton;
        client.messages.create({
            from: 'whatsapp:+14155238886',
            body: "The timer is running, you have been in " + typeButton + " for a long time!!",
            to: 'whatsapp:+5492616736217' //Number that I want to notify
        }).then(function (message) {
            console.log('WhatsApp sended: ' + message.sid);
            return;
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.sendWhatsApp = sendWhatsApp;
