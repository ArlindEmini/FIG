import express from 'express';

import UserController from '../controllers/user';
import HttpError from '../models/http-error';
import { generateToken, validatePassword, validateAdmin } from '../utils/utils';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserController.getByUsername(username);

    if(!user) {
        return res.status(HttpError('Unable to find the user with provided username', 404)).json(err).end();
    }

    const isValid = await validatePassword(password, user.password);

    if(!isValid) {
        return res.status(HttpError('Invalid password', 401)).json(err).end();
    }

    const token = generateToken(user.id);

    return res.status(200).json({token}).end();
});

router.get('/', async (req, res) => {
    const { queryStringParameters, headers } = req;

    const response = await UserController.fetchAll(queryStringParameters);

    return res.status(200).json({response}).end();
});

router.post('/', async (req, res) => {
    const { params, headers } = req;

    if (!await validateAdmin(headers.authorization)) {
        return res.status(HttpError('Unauthorised action for this user', 401)).json(err).end();
    }

    const user = await UserController.create(params);

    return res.status(200).json({user}).end();
});

router.put('/:id', async (req, res) => {
    const { params, headers, id } = req;

    if(!await validateAdmin(headers.authorization)) {
        return res.status(HttpError('Unauthorised action for this user', 401)).json(err).end();
    }

    const existingUser = await UserController.get(id);

    if(!existingUser) {
        return res.status(HttpError('User doesn\'t exist', 404)).json(err).end();
    }

    const user = await UserController.update(id, params, existingUser);

    return res.status(200).json({user}).end();
});

router.get('/:id', async (req, res) => {
    const { id } = req;

    const user = await UserController.get(id);

    if(!user) {
        return res.status(HttpError('User doesn\'t exist', 404)).json(err).end();
    }

    return res.status(200).json({user}).end();
});

router.delete('/:id', async (req, res) => {
    const { params, headers, id } = req;

    if(!await validateAdmin(headers.authorization)) {
        return res.status(HttpError('Unauthorised action for this user', 401)).json(err).end();
    }

    const existingUser = await UserController.get(id);

    if(!existingUser) {
        return res.status(HttpError('User doesn\'t exist', 404)).json(err).end();
    }

    const user = await UserController.delete(id);

    return res.status(200).json({res: 'User deleted successfully'}).end();
});

export default router;