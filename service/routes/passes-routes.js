import express from "express";

import passController from "../controllers/passes.js";
import affairController from "../controllers/affair.js";

import {
  validateAdmin,
  getIdFromToken
} from "../utils/utils.js";
import authenticateToken from "../controllers/authentication.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { query, headers } = req;

    if (await validateAdmin(headers.authorization)) {
      const response = await passController.fetchAll(query);
      return res.status(200).json({ response }).end();
    } else {
      query.user_id = getIdFromToken(headers.authorization);
      const response = await passController.fetchAll(query);
      return res.status(200).json({ response }).end();
    }
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//checkIn
router.post(
  "/check-in/affairs/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { headers, params } = req;
      const { id } = params;

      const userId = getIdFromToken(headers.authorization);
      await passController.checkIn(id, userId);

      return res.status(200).json({ message: "Pass completed successfully"}).end();
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({ error }).end();
    }
  }
);

router.post("/:id/check-out", authenticateToken, async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    await passController.checkOut(id);

    return res.status(200).json({ message: "Check out completed successfully" }).end();
  } catch (error) {
    console.log("ERR", error);
    return res.status(400).json({ error }).end();
  }
});

router.post("/:id/confirm", authenticateToken, async (req, res) => {
    try {
      const { params, headers } = req;
      const { id } = params;

      if (!(await validateAdmin(headers.authorization))) {
        return res
          .status(401)
          .json({ error: "Unauthorised action for this user" })
          .end();
      }
  
      await passController.passConfirm(id);
  
      return res.status(200).json({ message: "Check out completed successfully" }).end();
    } catch (error) {
      console.log("ERR", error);
      return res.status(400).json({ error }).end();
    }
  });

router.post("/check-in/qr/:id", authenticateToken, async (req, res) => {
    try {
      const { params, headers } = req;
      const { id } = params;

      const userId = getIdFromToken(headers.authorization);

      const existingAffair = await affairController.getByQrCode(id);

      if (!existingAffair) {
        return res
          .status(404)
          .json({ error: "Invalid qr code selected" })
          .end();
      }
  
      await passController.checkIn(existingAffair.id, userId);
  
      return res.status(200).json({ message: "Check out completed successfully" }).end();
    } catch (error) {
      console.log("ERR", error);
      return res.status(400).json({ error }).end();
    }
  });

//Get pass by id
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const pass = await passController.get(id);

    if (!pass) {
      return res
        .status(404)
        .json({ error: "Unable to find the pass" })
        .end();
    }

    return res.status(200).json({ pass }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//Delete existing pass by id
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { params, headers } = req;
    const { id } = params;

    if (!(await validateAdmin(headers.authorization))) {
      return res
        .status(401)
        .json({ error: "Unauthorised action for this user" })
        .end();
    }

    const existingpass = await passController.get(id);

    if (!existingpass) {
      return res.status(404).json({ error: "Unable to find the pass" }).end();
    }

    await passController.delete(id);

    return res.status(200).json({ res: "pass deleted successfully" }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

export default router;
