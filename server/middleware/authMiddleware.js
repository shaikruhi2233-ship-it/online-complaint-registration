const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log("\n========== AUTH MIDDLEWARE ==========");

    // Get Authorization Header
    const authHeader = req.header("Authorization");

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No Token Provided",
      });
    }

    // Remove "Bearer " if present
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ TOKEN VERIFIED");
    console.log(decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("❌ JWT VERIFY FAILED");
    console.log(err);

    return res.status(401).json({
      message: "Invalid Token",
      error: err.message,
    });
  }
};

module.exports = authMiddleware;