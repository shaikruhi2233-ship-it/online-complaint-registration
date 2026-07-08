const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");

// Create Complaint
router.post("/", authMiddleware, createComplaint);

// Get All Complaints
router.get("/", authMiddleware, getComplaints);

// Update Complaint Status
router.put("/:id", authMiddleware, updateComplaint);

// Delete Complaint
router.delete("/:id", authMiddleware, deleteComplaint);

module.exports = router;