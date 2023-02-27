import express from "express";

import UrgencyController from "../controllers/urgencies.js";
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

router.get("/", async (req,res) => {
    try {
        // const { query, headers } = req;
    
        const response = await UrgencyController.fetchAll();
    
        return res.status(200).json({ response }).end();
      } catch (error) {
        
        return res.status(400).json({ error }).end();
      }
})

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
  
      const urgency = await UrgencyController.createUrgency(body);
     
  
      return res.status(200).json({ urgency }).end();
    } catch (error) {
      console.log("error", error)
      return res.status(400).json({ error }).end();
    }
  });

  router.get("/:id", authenticateToken, async (req, res) => {
    try {
      const { params, headers } = req;
      const { id } = params;
  
      if (!(await validateAdmin(headers.authorization))) {
        return res
        .status(404)
        .json({ error: "This operation is not allowed for this user" })
        .end();
      }
  
      const urgency = await UrgencyController.get(id);
  
      if (!urgency) {
        return res
          .status(404)
          .json({ error: "Unable to find the urgency" })
          .end();
      }
  
      return res.status(200).json({ urgency }).end();
    } catch (error) {
      return res.status(400).json({ error }).end();
    }
  });

  router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { body, headers, params } = req;
    const { id } = params;

    if (!(await validateAdmin(headers.authorization))) {
      return res
        .status(401)
        .json({ error: "Unauthorised action for this user" })
        .end();
    }

    const existingUrgency = await UrgencyController.get(id);

    if (!existingUrgency) {
      return res
        .status(404)
        .json({ error: "Unable to find the urgency" })
        .end();
    }

    const urgency = await UrgencyController.update(
      id,
      body,
      existingUrgency
    );

    return res.status(200).json({ urgency }).end();
  } catch (error) {
    
    return res.status(400).json({ error }).end();
  }
});

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

    const existingUrgency = await UrgencyController.get(id);

    if (!existingUrgency) {
      return res.status(404).json({ error: "Unable to find the urgency" }).end();
    }

    await UrgencyController.delete(id);

    return res.status(200).json({ res: "affair deleted successfully" }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

router.post(
  "/check-in/urgencies/:id/",
  authenticateToken,
  async (req, res) => {
    try {
      const { headers, params } = req;
      const { id } = params;
      console.log("id", id)

      const userId = getIdFromToken(headers.authorization);
      await UrgencyController.checkIn(id);

      return res.status(200).json({ message: "Urgency completed successfully"}).end();
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({ error }).end();
    }
  }
);



export default router;
