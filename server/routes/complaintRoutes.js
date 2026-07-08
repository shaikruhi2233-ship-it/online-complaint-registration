const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("====================================");
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({
      message: "No Token Provided",
    });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  console.log("Token:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("TOKEN VERIFIED");
    console.log(decoded);

    req.user = decoded;
    next();

  } catch (err) {

    console.log("=========== JWT ERROR ===========");
    console.log("Error Name:", err.name);
    console.log("Error Message:", err.message);
    console.log("Token Length:", token.length);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    return res.status(401).json({
      message: "Invalid Token",
      error: err.message,
    });
  }
};

module.exports = authMiddleware;