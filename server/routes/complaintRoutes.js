const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// User
router.post("/", authMiddleware, createComplaint);
router.get("/", authMiddleware, getComplaints);

// Admin Only
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateComplaint
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteComplaint
);

module.exports = router;