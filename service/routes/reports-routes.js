import express from "express"
import ReportsService from "../controllers/reports.js";
const router = express.Router();

import authenticateToken from "../controllers/authentication.js";

router.get("/", authenticateToken, async(req,res) => {
    try{
        const {query, headers} = req;

        return res.status(200).json("routes of reports")
    } catch(error){
        return res.status(400).json({error}).end();
    }
})

export default router;
