const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { testConnection } = require("./config/db");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files middleware
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/admin", adminRoutes);

// Error handling
app.use((req, res) => {
  res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Test database connection without blocking server start
  testConnection()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection failed:", err.message));
});
