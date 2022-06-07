import express from 'express';

import ClientController from '../controllers/client.js';
import { generateToken, validatePassword, validateAdmin } from '../utils/utils.js';
import authenticateToken from '../controllers/authentication.js';
import validateClient from '../validators/client-validator.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const { query, headers } = req;

        const response = await ClientController.fetchAll(query);
    
        return res.status(200).json({response}).end();
    } catch (error) {
        return res.status(400).json({error}).end();
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { body, headers } = req;
        validateClient(body);

        if (!await validateAdmin(headers.authorization)) {
            return res.status(401).json({error: 'Unauthorised action for this user'}).end();
        }
    
        const user = await ClientController.create(body);
    
        return res.status(200).json({user}).end();
    } catch (error) {
        return res.status(400).json({error}).end();
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { body, headers, params } = req;
        const { id } = params;

        if(!await validateAdmin(headers.authorization)) {
            return res.status(401).json({error: 'Unauthorised action for this user'}).end();
        }
    
        const existingClient = await ClientController.get(id);
    
        if(!existingClient) {
            return res.status(404).json({error: 'Unable to find the client'}).end();
        }
    
        const user = await ClientController.update(id, body, existingClient);
    
        return res.status(200).json({user}).end();
    } catch (error) {
        return res.status(400).json({error}).end();
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;

        const client = await ClientController.get(id);
    
        if(!client) {
            return res.status(404).json({error: 'Unable to find the client'}).end();
        }
    
        return res.status(200).json({client}).end();
    } catch (error) {
        console.log("ERROr", error);
        return res.status(400).json({error}).end();
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { params, headers } = req;
        const { id } = params;

        if(!await validateAdmin(headers.authorization)) {
            return res.status(401).json({error: 'Unauthorised action for this user'}).end();
        }
    
        const existingClient = await ClientController.get(id);
    
        if(!existingClient) {
            return res.status(404).json({error: 'Unable to find the client'}).end();
        }
    
        await ClientController.delete(id);
    
        return res.status(200).json({res: 'Client deleted successfully'}).end();
    } catch (error) {
        return res.status(400).json({error}).end()
    }
});

export default router;