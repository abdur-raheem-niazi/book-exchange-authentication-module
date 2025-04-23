const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middlewares/upload");
const { isLoggedIn } = require("../middlewares/auth");

// Home page
router.get("/", authController.getHomePage);

// Login routes
router.get("/login", isLoggedIn, authController.getLoginPage);
router.post("/login", authController.loginUser);

// Register routes
router.get("/register", isLoggedIn, authController.getRegisterPage);
router.post(
  "/register",
  upload.single("profilePicture"),
  authController.registerUser
);

// Logout route
router.get("/logout", authController.logoutUser);

module.exports = router;
