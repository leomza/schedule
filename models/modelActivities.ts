export {};

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const activitiesJsonPath = path.resolve(__dirname, "./activities.json");

//Function to read the JSON of created users
const readJsonActivities = () => {
  try {
    const activities = fs.readFileSync(activitiesJsonPath);
    return JSON.parse(activities);
  } catch (error) {
    console.error(error);
  }
};

export class Activity {
  uuid: string;
  activity: string;
  minutes: number;
  seconds: number;

  constructor(activity, minutes, seconds) {
    this.uuid = uuidv4();
    this.activity = activity;
    this.minutes = minutes;
    this.seconds = seconds;
  }
}

export class Activities {
  activities: Array<Activity>;

  constructor() {
    this.activities = readJsonActivities();
  }

  updateUsersJson() {
    try {
      fs.writeFileSync(activitiesJsonPath, JSON.stringify(this.activities));
    } catch (error) {
      console.error(error);
    }
  }

  createActivity(userActivity) {
    try {
      this.activities.unshift(userActivity);
      this.updateUsersJson();
    } catch (error) {
      console.error(error);
    }
  }
}
