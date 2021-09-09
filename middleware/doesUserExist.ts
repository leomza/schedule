export { };

import { Users } from '../models/modelUsers';

export function doesUserExistLogin(req, res, next) {
    try {
        const { email } = req.body;
        //Get all users to see if the user exist
        const allUsers = new Users();
        const userExist = allUsers.findUser(email);
        
        if (!userExist) {
            res.status(400).send(`User doesn't exist`);
            return;
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}