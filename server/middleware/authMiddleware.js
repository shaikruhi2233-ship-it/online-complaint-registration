const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Received Token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
  console.error("JWT ERROR:", err);

  return res.status(401).json({
    success: false,
    message: "Invalid Token",
    error: err.message,
  });
}

module.exports = authMiddleware;