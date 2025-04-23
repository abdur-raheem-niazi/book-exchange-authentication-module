const User = require("../models/User");
const { sendApprovalEmail } = require("../utils/email");

/**
 * Controller functions for admin routes
 */
const adminController = {
  // Display admin dashboard with all users
  getDashboard: async (req, res) => {
    try {
      const users = await User.getAll();

      res.render("admin/dashboard", {
        user: req.user,
        users,
        success: req.query.success,
        error: req.query.error,
      });
    } catch (error) {
      console.error("Admin dashboard error:", error.message);
      res.status(500).send("Server Error");
    }
  },

  // Handle user approval
  approveUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const approved = await User.approveUser(userId);

      if (approved) {
        const user = await User.findById(userId);
        await sendApprovalEmail(user);
        return res.redirect(
          "/admin/dashboard?success=User approved successfully"
        );
      }

      res.redirect("/admin/dashboard?error=Failed to approve user");
    } catch (error) {
      console.error("Approve user error:", error.message);
      res.redirect("/admin/dashboard?error=Server Error");
    }
  },
};

module.exports = adminController;
