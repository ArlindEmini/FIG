import express from "express";

import authenticateToken from '../controllers/authentication.js';

const router = express.Router();

router.post("/", authenticateToken);

export default router;
