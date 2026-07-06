const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// Register User
// ==========================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Login User
// ==========================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Email entered:", email);

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Get Total Users
// ==========================
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    res.status(200).json({
      success: true,
      totalUsers,
    });

  } catch (error) {
    console.error("Total Users Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};