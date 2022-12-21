import express from "express";

import AffairController from "../controllers/affair.js";
import {
  validateAdmin,
  getIdFromToken,
} from "../utils/utils.js";
import authenticateToken from "../controllers/authentication.js";
import validateAffair from "../validators/affair-validator.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { query, headers } = req;

    if (await validateAdmin(headers.authorization)) {
      const response = await AffairController.fetchAll(query);
      return res.status(200).json({ response }).end();
    } else {
      const userId = getIdFromToken(headers.authorization);
      const response = await AffairController.fetchAll(userId);
      return res.status(200).json({ response }).end();
    }
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

router.post(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      const { body, headers, params } = req;
      const { clientId, userId } = params;
      validateContract(body);

      if (!(await validateAdmin(headers.authorization))) {
        return res
          .status(401)
          .json({ error: "Unauthorised action for this user" })
          .end();
      }

      const contract = await AffairController.create(clientId, userId, body);

      return res.status(200).json({ contract }).end();
    } catch (error) {
      return res.status(400).json({ error }).end();
    }
  }
);

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

    const existingAffair = await AffairController.get(id);

    if (!existingContract) {
      return res
        .status(404)
        .json({ error: "Unable to find the contract" })
        .end();
    }

    const affair = await AffairController.get(
      id,
      body,
      existingAffair
    );

    return res.status(200).json({ affair }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { params, headers } = req;
    const { id } = params;

    if ((await validateAdmin)) {
      const affair = await AffairController.get(id);

      if (!affair) {
        return res
          .status(404)
          .json({ error: "Unable to find the affair" })
          .end();
      }

      return res.status(200).json({ contract }).end();
    } else {
        const affair = await AffairController.get(id);

        if (!affair) {
            return res
            .status(404)
            .json({ error: "Unable to find the contract" })
            .end();
        }

        if (affair && contract.affair === getIdFromToken(headers.authorization)) {
            return res.status(200).json({ contract }).end();
        } else {
            return res
              .status(404)
              .json({ error: "This operation is not allowed for this user" })
              .end();
        }
    }
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

router.get("/clients/:id", authenticateToken, async (req, res) => {
  try {
    const { params, headers } = req;
    const { id } = params;

    if (await validateAdmin(headers.authorization)) {
      const contracts = await AffairController.fetchByClientId(id);

      return res.status(200).json({ contracts }).end();
    } else {
      const userId = getIdFromToken(headers.authorization);
      const contracts = await AffairController.getByClientAndUserId(
        id,
        userId
      );
      return res.status(200).json({ contracts }).end();
    }
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

router.get("/users/:id", authenticateToken, async (req, res) => {
  try {
    const { params, headers } = req;
    const { id } = params;

    if (await validateAdmin(headers.authorization) || getIdFromToken(headers.authorization) === id) {
        const contracts = await AffairController.fetchByUserId(id);

        return res.status(200).json({contracts}).end();
    } else {
        return res
        .status(404)
        .json({ error: "This operation is not allowed for this user" })
        .end();
    }
  } catch (error) {
    console.log("ERROr", error);
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

    const existingContract = await AffairController.get(id);

    if (!existingContract) {
      return res.status(404).json({ error: "Unable to find the contract" }).end();
    }

    await AffairController.delete(id);

    return res.status(200).json({ res: "Contract deleted successfully" }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

export default router;
