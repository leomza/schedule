"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var cookieParser = require('cookie-parser'); //This is to iniitializate Firebase


var admin = require('firebase-admin');

var serviceAccount = require('./schedule-51dfa-firebase-adminsdk-l883n-2ff0688573.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
app.use(express.json());
app.use(express["static"]('public')); //I use this to read a cookie (I can create it with out this)

app.use(cookieParser()); //Route (I import the routes of activities)

var clientRoute = require('./routes/routeClients');

var projectRoute = require('./routes/routeProjects');

var taskRoute = require('./routes/routeTasks');

var userRoute = require('./routes/routeUsers');

var settingsRoute = require('./routes/routeSettings'); //Use of that Routes that I imported


app.use('/clients', clientRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);
app.use('/users', userRoute);
app.use('/settings', settingsRoute);
app.listen(port, function () {
  console.log("Listening on port: ".concat(port));
});