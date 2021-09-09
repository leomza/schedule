"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express["static"]('public')); //I use this to read a cookie (I can create it with out this)

app.use(cookieParser()); //Route (I import the routes of activities)

var clientRoute = require('./routes/routeClients');

var projectRoute = require('./routes/routeProjects');

var taskRoute = require('./routes/routeTasks');

var userRoute = require('./routes/routeUsers'); //Use of that Routes that I imported


app.use('/clients', clientRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);
app.use('/users', userRoute);
app.listen(port, function () {
  console.log("Listening on port: ".concat(port));
});