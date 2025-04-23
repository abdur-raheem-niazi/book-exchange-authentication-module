const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateToken, isAdmin } = require("../middlewares/auth");

// Apply authentication middleware to all admin routes
router.use(authenticateToken);
router.use(isAdmin);

// Admin dashboard
router.get("/dashboard", adminController.getDashboard);

// Approve user
router.get("/approve/:id", adminController.approveUser);

module.exports = router;
