export {};

//I import the classes (with Methods) of the Models that Im going to use here
import { Activity, Activities } from "../models/modelActivities";

//Function to add a new user into the JSON
export function newActivity(req, res) {
  try {
    //Get the information from the body
    const { activity, restMinutes, restSeconds } = req.body;
    //Initialice a new instance of the Activity
    const userActivity = new Activity(activity, restMinutes, restSeconds);
    //Initialice a new instance of Activity (the initialization will read the JSON of Activities)
    const allActivities = new Activities();
    allActivities.createActivity(userActivity);
    res.send({ message: "A new Activity was added", userActivity });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

//Function to get all the surveys from a specific user
export function getActivities(req, res) {
  try {
    const allActivities = new Activities();
    console.log("todas las actividades son:", allActivities);
    res.send({ message: "You get all the activities", allActivities });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}
