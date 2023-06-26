import express from "express";

import ConfigService from "../controllers/config.js";
import HttpError from "../models/http-error.js";
import {
  generateToken,
  validatePassword,
  validateAdmin,
  getIdFromToken,
} from "../utils/utils.js";
import authenticateToken from "../controllers/authentication.js";
import validateUser from "../validators/user-validator.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const qr_codes = await ConfigService.fetchAll();

    return res.status(200).json({ qr_codes }).end();
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ error }).end();
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { body, headers } = req;
    //   validateUser(body);

    if (!(await validateAdmin(headers.authorization))) {
      return res
        .status(401)
        .json({ error: "Unauthorised action for this user" })
        .end();
    }

    const qrCode = await ConfigService.createQrCodes(body);

    return res.status(200).json({ qrCode }).end();
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ error }).end();
  }
});

export default router;
