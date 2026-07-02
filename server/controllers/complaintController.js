const Complaint = require("../models/Complaint");

// Create Complaint
// Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      userId: req.user.id,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
        category: req.body.category,
      subject: req.body.subject,
      location: req.body.location,
      complaint: req.body.complaint,
      status: "Pending",
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Complaints
   // Get Complaints
exports.getComplaints = async (req, res) => {
  try {
    console.log("Logged In User:", req.user);

    let complaints;

    if (req.user.role === "admin") {
      complaints = await Complaint.find().sort({
        createdAt: -1,
      });
    } else {
      complaints = await Complaint.find({
        userId: req.user.id,
      }).sort({
        createdAt: -1,
      });
    }

    console.log("Complaints Returned:", complaints.length);

    res.json(complaints);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Complaint
exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Complaint Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};