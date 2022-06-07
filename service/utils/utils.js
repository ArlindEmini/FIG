import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserController from '../controllers/user.js';

export const generateToken = (id) => jwt.sign({ id }, process.env.SECRET_TOKEN, {expiresIn: '1y'});

export const validatePassword = async (password, dbPassword) => bcrypt.compare(password, dbPassword);

export const validateAdmin = async (authorization) => {

    const response = jwt.verify(authorization, process.env.SECRET_TOKEN);

    if (response && response.id) {
        const user = await UserController.get(response.id);
        console.log("USER", user);
        return user && user.user_type === 0 ? true : false;
    }
    return false;
}