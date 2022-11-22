import express from "express";

import ContractController from "../controllers/contract.js";
import {
  validateAdmin,
  getUserIdFromToken
} from "../utils/utils.js";
import authenticateToken from "../controllers/authentication.js";
import validateContract from "../validators/contract-validator.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { query, headers } = req;

    if (await validateAdmin(headers.authorization)) {
      const response = await ContractController.fetchAll(query);
      return res.status(200).json({ response }).end();
    } else {
      return res.status(401).json({ error: "Unauthorised to fetch the contracts"}).end();
    }
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//create contract
router.post(
  "/clients/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { body, headers, params } = req;
      const { id } = params;
      validateContract(body);

      if (!(await validateAdmin(headers.authorization))) {
        return res
          .status(401)
          .json({ error: "Unauthorised action for this user" })
          .end();
      }

      const created_by = getUserIdFromToken(headers.authorization);
      const contract = await ContractController.create(id, body, created_by);

      return res.status(200).json({ contract }).end();
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({ error }).end();
    }
  }
);

//Update existing contract
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

    const existingContract = await ContractController.get(id);

    if (!existingContract) {
      return res
        .status(404)
        .json({ error: "Unable to find the contract" })
        .end();
    }

    const contract = await ContractController.update(
      id,
      body,
      existingContract
    );

    return res.status(200).json({ contract }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//Get contract by id
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

    const contract = await ContractController.get(id);

    if (!contract) {
      return res
        .status(404)
        .json({ error: "Unable to find the contract" })
        .end();
    }

    return res.status(200).json({ contract }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//Get all contracts by client id
router.get("/clients/:id", authenticateToken, async (req, res) => {
  try {
    const { params, headers } = req;
    const { id } = params;

    if (!(await validateAdmin(headers.authorization))) {
      return res
      .status(404)
      .json({ error: "This operation is not allowed for this user" })
      .end();
    };

    const contracts = await ContractController.fetchAll({client_id, id});

    return res.status(200).json({ contracts }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//Delete existing contract by id
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

    const existingContract = await ContractController.get(id);

    if (!existingContract) {
      return res.status(404).json({ error: "Unable to find the contract" }).end();
    }

    await ContractController.delete(id);

    return res.status(200).json({ res: "Contract deleted successfully" }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

export default router;
