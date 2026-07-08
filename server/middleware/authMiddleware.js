const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token Format.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Save user info in request
    req.user = verified;

    next();
  } catch (err) {
    console.error("JWT ERROR:", err);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
      error: err.message,
    });
  }
};

module.exports = authMiddleware;