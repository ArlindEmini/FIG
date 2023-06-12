import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).json("home").end();
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

export default router;
