/**
 * Controller functions for user routes
 */
const userController = {
  // Display welcome page for logged-in users
  getWelcome: async (req, res) => {
    try {
      res.render("welcome", {
        user: req.user,
        success: "You have successfully logged in!",
      });
    } catch (error) {
      console.error("Welcome page error:", error.message);
      res.status(500).render("error", {
        error: "Failed to load welcome page",
      });
    }
  },
};

module.exports = userController;
