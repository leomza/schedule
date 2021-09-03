const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

//Route (I import the routes of activities)
const activityRoute = require('./routes/routeActivity');
const clientRoute = require('./routes/routeClients');
const projectRoute = require('./routes/routeProjects');
const taskRoute = require('./routes/routeTasks');

//Use of that Routes that I imported
app.use('/activity', activityRoute);
app.use('/clients', clientRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);

app.listen(port, () => { console.log(`Listening on port: ${port}`) });