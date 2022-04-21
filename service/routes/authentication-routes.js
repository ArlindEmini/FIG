import express from "express";

import authController from '../controllers/authentication';

const router = express.Router();

router.post("/", authController.auth);

export default router;
