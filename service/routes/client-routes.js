const express = require("express");
const router = express.Router();

const clientsController = require("../controllers/client");


router.post("/", clientsController.createClient);
router.get("/private", clientsController.getPrivateClients);
router.get("/enterprise", clientsController.getEnterpriseClients);
router.get("/:cid", clientsController.getClientById);


module.exports = router;
