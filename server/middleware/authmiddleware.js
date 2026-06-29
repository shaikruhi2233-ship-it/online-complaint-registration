const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from request header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided.",
      });
    }

    // Verify token
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store user info in request
    req.user = verified;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;