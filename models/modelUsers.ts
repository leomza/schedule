export { };
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const usersJsonPath = path.resolve(__dirname, "./users.json");

//Function to read the JSON of created users
const readJsonUsers = () => {
    try {
        const users = fs.readFileSync(usersJsonPath);
        return JSON.parse(users);
    } catch (error) {
        console.error(error);
    }
};

export class User {
    uuid: string;
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.uuid = uuidv4();
        this.email = email;
        this.password = password;
    }
}

export class Users {
    users: Array<User>;

    constructor() {
        this.users = readJsonUsers();
    }

    updateUsersJson() {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        } catch (error) {
            console.error(error);
        }
    }

    createUser(user) {
        try {
            this.users.push(user);
            this.updateUsersJson();
        } catch (error) {
            console.error(error);
        }
    }

    findUser(email) {
        try {
            const userInfo = this.users.find(userElement => userElement.email === email);
            if (userInfo) {
                return userInfo;
            } else {
                return undefined
            }
        } catch (error) {
            console.error(error);
        }
    }

    findUserByEmailAndPassword(email, password) {
        try {
            const userInfo = this.users.find(userElement => userElement.email === email && userElement.password === password);
            if (userInfo) {
                return userInfo;
            } else {
                return undefined
            }
        } catch (error) {
            console.error(error);
        }
    }

    findUserById(id) {
        try {
            const userInfo = this.users.find(userElement => userElement.uuid === id);
            if (userInfo) {
                return userInfo;
            } else {
                return undefined
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export class TimerUser {
    uuid: string;
    idProject: string;
    typeOfButton: string;
    userEmail: string;
    timeInHours: number;

    constructor(idProject: string, typeOfButton: string, userEmail: string, timeInHours: number) {
        this.uuid = uuidv4();
        this.idProject = idProject;
        this.typeOfButton = typeOfButton;
        this.userEmail = userEmail;
        this.timeInHours = timeInHours;
    }
}