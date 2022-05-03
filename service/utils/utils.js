import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserController from '../controllers/user';

export const generateToken = (id) => jwt.sign({ id }, process.env.SECRET_TOKEN, {expiresIn: '1y'});

export const validatePassword = async () => bcrypt.compare(password, dbPassword);

export const validateAdmin = async (authorization) => {

    const response = jwt.verify(authorization, process.env.SECRET_TOKEN);

    if (response && response.id) {
        const user = await UserController.get(response.id);
        return user && user.user_type === 0 ? true : false;
    }
    return false;
}