import express from "express";

import UserController from "../controllers/user.js";
import HttpError from "../models/http-error.js";
import {
  generateToken,
  validatePassword,
  validateAdmin,
} from "../utils/utils.js";
import authenticateToken from "../controllers/authentication.js";
import validateUser from "../validators/user-validator.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserController.getByUsername(username);

    if (!user) {
      return res
        .status(
          new HttpError("Unable to find the user with provided username", 404)
        )
        .json(err)
        .end();
    }

    const isValid = await validatePassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "invalid password" }).end();
    }

    const token = generateToken(user.id);

    return res.status(200).json({ token }).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error }).end();
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { query, headers } = req;

    const response = await UserController.fetchAll(query);

    return res.status(200).json({ response }).end();
  } catch (error) {
    console.log("error", error)
    return res.status(400).json({ error }).end();
  }
});

router.post("/", authenticateToken, async (req, res) => {
    console.log("createUsers", req.body)
  try {
    const { body, headers } = req;
    validateUser(body);

    if (!(await validateAdmin(headers.authorization))) {
      return res
        .status(401)
        .json({ error: "Unauthorised action for this user" })
        .end();
    }

    const user = await UserController.create(body);

    return res.status(200).json({ user }).end();
  } catch (error) {
    console.log("ERROr", error);
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

    const existingUser = await UserController.get(id);

    if (!existingUser) {
      return res.status(404).json({ error: "Unable to find the user" }).end();
    }

    const user = await UserController.update(id, body, existingUser);

    return res.status(200).json({ user }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const user = await UserController.get(id);

    if (!user) {
      return res.status(404).json({ error: "Unable to find the user" }).end();
    }

    return res.status(200).json({ user }).end();
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

    const existingUser = await UserController.get(id);

    if (!existingUser) {
      return res.status(404).json({ error: "Unable to find the user" }).end();
    }

    await UserController.delete(id);

    return res.status(200).json({ res: "User deleted successfully" }).end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

router.post("/time-off/:id", authenticateToken, async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;

    const pto = await UserController.requestPto(body, id);

    return res.status(200).json({ pto }).end();
  } catch (error) {
    console.log("error", error)
    return res.status(400).json({ error }).end();
  }
});

router.get("/:id/time-off", authenticateToken, async (req, res) => {
  try {
    const {params} = req
    const {id} = params
    
    const pto = await UserController.getPtoByUserId(id)

    return res.status(200).json({pto}).end();
  } catch (error) {
      console.log("error", error)
      return res.status(400).json({error}).end();
  }
});

export default router;

