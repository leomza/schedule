"use strict";
exports.__esModule = true;
exports.userCookieRead = exports.userCookieWrite = void 0;
var jwt = require('jwt-simple');
require('dotenv').config();
var modelUsers_1 = require("../models/modelUsers");
function userCookieWrite(req, res, next) {
    try {
        //Get the information from the body and from the middleware (doesUserExist)
        var _a = req.body, email = _a.email, password = _a.password;
        var allUsers = new modelUsers_1.Users();
        var user = allUsers.findUserByEmailAndPassword(email, password);
        //As when Im doing the register the user doesnt exist, I will create it so I will his UUID
        if (!user) {
            res.status(400).send("Wrong password");
            return;
        }
        //Here I set the cookie (the cookie is only going to contain the ID of the user)
        var cookieToWrite = JSON.stringify({ id: user.uuid });
        var token = jwt.encode(cookieToWrite, process.env.SECRET_KEY);
        //The cookie is going to expire in 24 hours
        res.cookie("userInfo", token, { maxAge: 86400000, httpOnly: true });
        req.email = email;
        //"Next" means that I will continue with the Route
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.userCookieWrite = userCookieWrite;
function userCookieRead(req, res, next) {
    try {
        var userInfo = req.cookies.userInfo;
        if (userInfo) {
            var decoded = jwt.decode(userInfo, process.env.SECRET_KEY);
            var cookie = JSON.parse(decoded);
            var id = cookie.id;
            var allUsers = new modelUsers_1.Users();
            var user = allUsers.findUserById(id);
            req.email = user.email;
            next();
        }
        else {
            res.status(401).send({ cookieExist: req.cookieExists, message: 'The session has expired. Please log in again.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.userCookieRead = userCookieRead;
