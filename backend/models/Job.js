const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company:     { type: String, required: true },
  position:    { type: String, required: true },
  location:    { type: String },
  status:      { type: String, enum: ["Applied", "Interview", "Offer", "Rejected"], default: "Applied" },
  notes:       { type: String },
  resumeLink:  { type: String },
  appliedDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);