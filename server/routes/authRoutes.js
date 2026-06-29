const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome! You have accessed a protected route.",
    user: req.user,
  });
});

module.exports = router;