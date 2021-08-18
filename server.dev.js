"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express["static"]('public')); //Route (I import the routes of activities)

var activity = require('./routes/routeActivity'); //Use of that Routes that I imported


app.use('/activity', activity);
app.listen(port, function () {
  console.log("Listening on port: ".concat(port));
});