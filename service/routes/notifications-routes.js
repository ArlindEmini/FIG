import express from "express";

import {
  generateToken,
  validatePassword,
  validateAdmin,
  getIdFromToken,
} from "../utils/utils.js";
import authenticateToken from "../controllers/authentication.js";
import NotificationsController from "../controllers/notifications.js";
import validateUser from "../validators/user-validator.js";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const response = await NotificationsController.getallNotifications();

    return res.status(200).json(response).end();
  } catch (error) {
   
    return res.status(400).json({ error }).end();
  }
});

router.post("/affair/:affair_id", authenticateToken, async (req, res) => {
  try {
    const { body, params, headers } = req;
    
    const {
      created_date,
      message
    } = body;

    const {affair_id} = params;
    
    const idFromtoken = await getIdFromToken(headers.authorization);
    const response = await NotificationsController.createAffairNotification(created_date, message,affair_id);

    return res.status(200).json(response).end();
  } catch (error) {
    
    return res.status(400).json({ error }).end();
  }
});

router.post("/time-off/:time_off_id", authenticateToken, async (req, res) => {
  try {
    const { body, params, headers } = req;
    
    const {time_off_id} = params;
    const idFromtoken = await getIdFromToken(headers.authorization);
    const response = await NotificationsController.createTimeOffNotification(body, idFromtoken,time_off_id);

    return res.status(200).json(response).end();
  } catch (error) {
    
    return res.status(400).json({ error }).end();
  }
});

export default router;
