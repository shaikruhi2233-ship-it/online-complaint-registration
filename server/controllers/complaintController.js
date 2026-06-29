const Complaint = require("../models/Complaint");

// ================================
// Create Complaint
// ================================
exports.createComplaint = async (req, res) => {
  try {
    const { name, email, subject, complaint } = req.body;

    const newComplaint = new Complaint({
      name,
      email,
      subject,
      complaint,
      status: "Pending",
    });

    await newComplaint.save();

    res.status(201).json({
      message: "Complaint Submitted Successfully",
      complaint: newComplaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Get All Complaints
// ================================
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({
      createdAt: -1,
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Update Complaint
// ================================
exports.updateComplaint = async (req, res) => {
  try {
    const updatedComplaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedComplaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint Updated Successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Delete Complaint
// ================================
exports.deleteComplaint = async (req, res) => {
  try {
    const deletedComplaint =
      await Complaint.findByIdAndDelete(req.params.id);

    if (!deletedComplaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};