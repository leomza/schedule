export { };
const jwt = require('jwt-simple');
require('dotenv').config();
import { User, Users } from '../models/modelUsers'

export function userCookieWrite(req, res, next) {
    try {
        //Get the information from the body and from the middleware (doesUserExist)
        const { email, password } = req.body;
        const allUsers = new Users();
        let user = allUsers.findUserByEmailAndPassword(email, password);

        //As when Im doing the register the user doesnt exist, I will create it so I will his UUID
        if (!user) {
            res.status(400).send(`Wrong password`);
            return;
        }

        //Here I set the cookie (the cookie is only going to contain the ID of the user)
        const cookieToWrite: string = JSON.stringify({ id: user.uuid });
        const token = jwt.encode(cookieToWrite, process.env.SECRET_KEY);
        //The cookie is going to expire in 24 hours
        res.cookie("userInfo", token, { maxAge: 86400000, httpOnly: true });

        req.email = email;
        //"Next" means that I will continue with the Route
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function userCookieRead(req, res, next) {
    try {
        const { userInfo } = req.cookies;

        if (userInfo) {
            const decoded = jwt.decode(userInfo, process.env.SECRET_KEY);
            const cookie = JSON.parse(decoded);
            const { id } = cookie;
            const allUsers = new Users();
            const user = allUsers.findUserById(id);

            req.email = user.email;
            next();
        } else {
            res.status(401).send({ cookieExist: req.cookieExists, message: 'The session has expired. Please log in again.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}