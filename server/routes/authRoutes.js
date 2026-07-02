const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getTotalUsers,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Total Registered Users (Admin Only)
router.get(
  "/total-users",
  authMiddleware,
  adminMiddleware,
  getTotalUsers
);

// Protected Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome! You have accessed a protected route.",
    user: req.user,
  });
});
console.log("✅ authRoutes loaded");

module.exports = router;