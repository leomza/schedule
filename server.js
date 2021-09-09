const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.static('public'));

//I use this to read a cookie (I can create it with out this)
app.use(cookieParser());

//Route (I import the routes of activities)
const clientRoute = require('./routes/routeClients');
const projectRoute = require('./routes/routeProjects');
const taskRoute = require('./routes/routeTasks');
const userRoute = require('./routes/routeUsers');

//Use of that Routes that I imported
app.use('/clients', clientRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);
app.use('/users', userRoute);

app.listen(port, () => { console.log(`Listening on port: ${port}`) });