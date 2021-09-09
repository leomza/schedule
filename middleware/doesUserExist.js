"use strict";
exports.__esModule = true;
exports.doesUserExistLogin = void 0;
var modelUsers_1 = require("../models/modelUsers");
function doesUserExistLogin(req, res, next) {
    try {
        var email = req.body.email;
        //Get all users to see if the user exist
        var allUsers = new modelUsers_1.Users();
        var userExist = allUsers.findUser(email);
        if (!userExist) {
            res.status(400).send("User doesn't exist");
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.doesUserExistLogin = doesUserExistLogin;
