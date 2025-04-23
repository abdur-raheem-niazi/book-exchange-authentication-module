const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Controller functions for authentication routes
 */
const authController = {
  // Render static pages
  getHomePage: (req, res) => {
    res.render("home");
  },

  getLoginPage: (req, res) => {
    res.render("login", {
      error: req.query.error || "",
      success: req.query.success || "",
    });
  },

  getRegisterPage: (req, res) => {
    res.render("register", {
      error: req.query.error || "",
      success: req.query.success || "",
    });
  },

  // Handle user registration
  registerUser: async (req, res) => {
    try {
      const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        email: req.body.email,
        profilePicture: req.file ? `/uploads/${req.file.filename}` : null,
      };

      // Check for existing username
      const existingUsername = await User.findByUsername(userData.username);
      if (existingUsername) {
        return res.render("register", {
          error: "Username already exists",
          formData: req.body,
        });
      }

      // Check for existing email
      const existingEmail = await User.findByEmail(userData.email);
      if (existingEmail) {
        return res.render("register", {
          error: "Email already exists",
          formData: req.body,
        });
      }

      // Create new user
      await User.create(userData);
      res.redirect(
        "/login?success=Registration successful. Please wait for admin approval."
      );
    } catch (error) {
      console.error("Registration error:", error.message);
      res.render("register", {
        error: "Registration failed. Please try again.",
        formData: req.body,
      });
    }
  },

  // Handle user login
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findByUsername(username);

      // Validate user exists
      if (!user) {
        return res.render("login", { error: "Invalid username or password" });
      }

      // Validate password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.render("login", { error: "Invalid username or password" });
      }

      // Check if user is approved
      if (!user.is_approved) {
        return res.render("login", {
          error: "Your account is not approved yet",
        });
      }

      // Create and set JWT token
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          isAdmin: user.is_admin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
      });

      // Redirect based on user role
      res.redirect(user.is_admin ? "/admin/dashboard" : "/welcome");
    } catch (error) {
      console.error("Login error:", error.message);
      res.render("login", { error: "Login failed. Please try again." });
    }
  },

  // Handle user logout
  logoutUser: (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
  },
};

module.exports = authController;
