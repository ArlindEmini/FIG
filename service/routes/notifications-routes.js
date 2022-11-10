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
    console.log("errorooo ndisdada", error);
    return res.status(400).json({ error }).end();
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { body, params, headers } = req;
    const { id } = params;

    const idFromtoken = await getIdFromToken(headers.authorization);
    const response = await NotificationsController.createNotification(body, idFromtoken);

    return res.status(200).json(response).end();
  } catch (error) {
    console.log("errorrrrrr12345789", error)
    return res.status(400).json({ error }).end();
  }
});

export default router;
