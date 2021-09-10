"use strict";
exports.__esModule = true;
exports.sendEmail = void 0;
//Require the package
var nodemailer = require('nodemailer');
function sendEmail(req, res, next) {
    var typeButton = req.params.typeButton;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'storeargento4@gmail.com',
            pass: 'Store123'
        }
    });
    var message;
    if (typeButton == 'call') {
        message = "<div>\n        <h1>Warning!</h1>\n        <p><b>THE TIMER IS RUNNING, YOU HAVE BEEN OUT FOR MORE THAN AN HOUR AND A HALF</b></p>\n        </div>";
    }
    else {
        message = "<div>\n        <h1>Warning!</h1>\n        <p><b>THE TIMER IS RUNNING, YOU HAVE BEEN ON A CALL FOR MORE THAN ONE HOUR</b></p>\n        </div>";
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
exports.sendEmail = sendEmail;
