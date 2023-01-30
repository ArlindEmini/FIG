import express from "express";

import AffairController from "../controllers/affair.js";
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
      const response = await AffairController.fetchAll(query);
      return res.status(200).json({ response }).end();
    } else {
      return res.status(401).json({ error: "Unauthorised to fetch the affairs"}).end();
    }
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//create affair
router.post(
  "/",
  authenticateToken,
  async (req, res) => {
    try {
      const { body, headers } = req;
      // validateAffair(body);

      if (!(await validateAdmin(headers.authorization))) {
        return res
          .status(401)
          .json({ error: "Unauthorised action for this user" })
          .end();
      }

    //   const created_by = getIdFromToken(headers.authorization);
      const affair = await AffairController.create(body);

      return res.status(200).json({ affair }).end();
    } catch (error) {
      console.log("error", error);
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

    if (!existingAffair) {
      return res
        .status(404)
        .json({ error: "Unable to find the affair" })
        .end();
    }

    const affair = await AffairController.update(
      id,
      body,
      existingAffair
    );

    return res.status(200).json({ affair }).end();
  } catch (error) {
    console.log("ERR", error);
    return res.status(400).json({ error }).end();
  }
});

//Get affair by id
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

    const affair = await AffairController.get(id);

    if (!affair) {
      return res
        .status(404)
        .json({ error: "Unable to find the affair" })
        .end();
    }

    return res.status(200).json({ affair }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//Get all affairs
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { headers, query } = req;

    if (!(await validateAdmin(headers.authorization))) {
      return res
      .status(404)
      .json({ error: "This operation is not allowed for this user" })
      .end();
    };

    const affairs = await AffairController.fetchAll(query);

    return res.status(200).json({ affairs }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

//Get all urgeency affairs
router.get("/all/urgencies", authenticateToken, async (req, res) => {
  try {
    const { headers, query } = req;
    console.log("urgencies routes")
    const urgencies = await AffairController.fetchAllUrgencies(query);

    return res.status(200).json({ urgencies }).end();
  } catch (error) {
    console.log("erroooor", error)
    return res.status(400).json({ error }).end();
  }
});

//Delete existing affair by id
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

    const existingAffair = await AffairController.get(id);

    if (!existingAffair) {
      return res.status(404).json({ error: "Unable to find the affair" }).end();
    }

    await AffairController.delete(id);

    return res.status(200).json({ res: "affair deleted successfully" }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

export default router;
