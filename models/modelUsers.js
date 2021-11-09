"use strict";
exports.__esModule = true;
exports.TimerUser = exports.Users = exports.User = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var usersJsonPath = path.resolve(__dirname, "./users.json");
//Function to read the JSON of created users
var readJsonUsers = function () {
    try {
        var users = fs.readFileSync(usersJsonPath);
        return JSON.parse(users);
    }
    catch (error) {
        console.error(error);
    }
};
var User = /** @class */ (function () {
    function User(email, password) {
        this.uuid = uuidv4();
        this.email = email;
        this.password = password;
    }
    return User;
}());
exports.User = User;
var Users = /** @class */ (function () {
    function Users() {
        this.users = readJsonUsers();
    }
    Users.prototype.updateUsersJson = function () {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.createUser = function (user) {
        try {
            this.users.push(user);
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.findUser = function (email) {
        try {
            var userInfo = this.users.find(function (userElement) { return userElement.email === email; });
            if (userInfo) {
                return userInfo;
            }
            else {
                return undefined;
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.findUserByEmailAndPassword = function (email, password) {
        try {
            var userInfo = this.users.find(function (userElement) { return userElement.email === email && userElement.password === password; });
            if (userInfo) {
                return userInfo;
            }
            else {
                return undefined;
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.findUserById = function (id) {
        try {
            var userInfo = this.users.find(function (userElement) { return userElement.uuid === id; });
            if (userInfo) {
                return userInfo;
            }
            else {
                return undefined;
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    return Users;
}());
exports.Users = Users;
var TimerUser = /** @class */ (function () {
    function TimerUser(idProject, typeOfButton, userEmail, timeInHours) {
        this.uuid = uuidv4();
        this.idProject = idProject;
        this.typeOfButton = typeOfButton;
        this.userEmail = userEmail;
        this.timeInHours = timeInHours;
    }
    return TimerUser;
}());
exports.TimerUser = TimerUser;
