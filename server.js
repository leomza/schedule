const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

//Route (I import the routes of activities)
const activity = require('./routes/routeActivity');

//Use of that Routes that I imported
app.use('/activity', activity);


app.listen(port, () => { console.log(`Listening on port: ${port}`) });