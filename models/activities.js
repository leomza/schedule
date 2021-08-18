"use strict";
exports.__esModule = true;
exports.Activities = exports.Activity = void 0;
var fs = require("fs");
var path = require("path");
var activitiesJsonPath = path.resolve(__dirname, "./activities.json");
//Function to read the JSON of created users
var readJsonActivities = function () {
    try {
        var activities = fs.readFileSync(activitiesJsonPath);
        return JSON.parse(activities);
    }
    catch (error) {
        console.error(error);
    }
};
var Activity = /** @class */ (function () {
    function Activity(activity, minutes, seconds) {
        this.activity = activity;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    return Activity;
}());
exports.Activity = Activity;
var Activities = /** @class */ (function () {
    function Activities() {
        this.activities = readJsonActivities();
    }
    Activities.prototype.updateUsersJson = function () {
        try {
            fs.writeFileSync(activitiesJsonPath, JSON.stringify(this.activities));
        }
        catch (error) {
            console.error(error);
        }
    };
    Activities.prototype.createActivity = function (userActivity) {
        try {
            this.activities.push(userActivity);
            this.updateUsersJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    return Activities;
}());
exports.Activities = Activities;
