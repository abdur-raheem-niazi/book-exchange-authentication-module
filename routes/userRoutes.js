const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/auth");

// Apply authentication middleware to all user routes

router.get("/welcome", authenticateToken, userController.getWelcome);
module.exports = router;
