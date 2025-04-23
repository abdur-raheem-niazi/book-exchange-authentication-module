const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Checks if user is authenticated via JWT token in cookies
 * Redirects to login if not authenticated or token is invalid
 */
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  // No token found
  if (!token) {
    return res.redirect("/login");
  }

  try {
    // Verify token and get user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    // User not found in database
    if (!user) {
      return res.redirect("/login");
    }

    // User not approved yet
    if (!user.is_approved) {
      res.clearCookie("token");
      return res.redirect("/login?error=Your account is not approved yet");
    }

    // Add user to request object for use in other middlewares/routes
    req.user = user;
    next();
  } catch (error) {
    // Invalid token
    console.error("Auth error:", error.message);
    res.clearCookie("token");
    return res.redirect("/login");
  }
};

/**
 * Checks if authenticated user is an admin
 * Redirects to dashboard if not an admin
 */
const isAdmin = (req, res, next) => {
  if (!req.user?.is_admin) {
    return res.redirect(
      "/welcome?error=Unauthorized access. Admin privileges required."
    );
  }
  next();
};

/**
 * Checks if user is already logged in
 * Redirects to welcome page if already logged in
 */
const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.redirect("/welcome");
  } catch (error) {
    res.clearCookie("token");
    next();
  }
};

module.exports = {
  authenticateToken,
  isAdmin,
  isLoggedIn,
};
