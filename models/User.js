const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

// Simple object with functions instead of a class with static methods
const User = {
  // Find user by username
  findByUsername: async (username) => {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      return rows[0] || null; // Simpler return
    } catch (error) {
      console.error("Error finding user by username:", error.message);
      throw error;
    }
  },

  // Find user by email
  findByEmail: async (email) => {
    try {
      const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error finding user by email:", error.message);
      throw error;
    }
  },

  // Find user by ID
  findById: async (id) => {
    try {
      const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error finding user by ID:", error.message);
      throw error;
    }
  },

  // Create a new user
  create: async (userData) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10); // Simplified bcrypt usage

      const [result] = await pool.execute(
        "INSERT INTO users (first_name, last_name, username, password, mobile_number, address, email, profile_picture, is_approved, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userData.firstName,
          userData.lastName,
          userData.username,
          hashedPassword,
          userData.mobileNumber,
          userData.address,
          userData.email,
          userData.profilePicture || null,
          false, // is_approved
          false, // is_admin
        ]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  },

  // Get all non-admin users
  getAll: async () => {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM users WHERE is_admin = 0"
      );
      return rows;
    } catch (error) {
      console.error("Error getting all users:", error.message);
      throw error;
    }
  },

  // Get users pending approval
  getPendingApproval: async () => {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM users WHERE is_approved = 0 AND is_admin = 0"
      );
      return rows;
    } catch (error) {
      console.error("Error getting pending approval users:", error.message);
      throw error;
    }
  },

  // Approve a user
  approveUser: async (id) => {
    try {
      const [result] = await pool.execute(
        "UPDATE users SET is_approved = 1 WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error approving user:", error.message);
      throw error;
    }
  },

  // Create admin if not exists
  createAdminIfNotExists: async () => {
    try {
      const adminUsername = process.env.ADMIN_USERNAME;
      const admin = await User.findByUsername(adminUsername);

      if (!admin) {
        const hashedPassword = await bcrypt.hash(
          process.env.ADMIN_PASSWORD,
          10
        );

        await pool.execute(
          "INSERT INTO users (first_name, last_name, username, password, mobile_number, address, email, is_approved, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            "Admin",
            "User",
            adminUsername,
            hashedPassword,
            "1234567890",
            "Admin Address",
            "admin@example.com",
            true,
            true,
          ]
        );
        console.log("Admin user created successfully");
      }
    } catch (error) {
      console.error("Error creating admin user:", error.message);
      throw error;
    }
  },
};

module.exports = User;
