"use strict";
exports.__esModule = true;
exports.getActivities = exports.newActivity = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var modelActivities_1 = require("../models/modelActivities");
//Function to add a new user into the JSON
function newActivity(req, res) {
    try {
        //Get the information from the body
        var _a = req.body, activity = _a.activity, restMinutes = _a.restMinutes, restSeconds = _a.restSeconds;
        //Initialice a new instance of the Activity
        var userActivity = new modelActivities_1.Activity(activity, restMinutes, restSeconds);
        //Initialice a new instance of Activity (the initialization will read the JSON of Activities)
        var allActivities = new modelActivities_1.Activities();
        allActivities.createActivity(userActivity);
        res.send({ message: "A new Activity was added", userActivity: userActivity });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.newActivity = newActivity;
//Function to get all the surveys from a specific user
function getActivities(req, res) {
    try {
        var allActivities = new modelActivities_1.Activities();
        console.log("todas las actividades son:", allActivities);
        res.send({ message: "You get all the activities", allActivities: allActivities });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.getActivities = getActivities;
