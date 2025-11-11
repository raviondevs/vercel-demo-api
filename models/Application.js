const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  experience: { type: String },
  expectedSalary: { type: String },
  availableDate: { type: String },
  heardFrom: { type: String },
  resumeUrl: { type: String, required: true },
  portfolioUrl: { type: String },
  linkedinUrl: { type: String },
  githubUrl: { type: String },
  coverLetter: { type: String },
  appliedAt: { type: Date, default: Date.now },
  jobInfo: {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    jobTitle: { type: String },
    jobDepartment: { type: String },
  },
});



module.exports = mongoose.model("Application", applicationSchema);
