const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const authenticateToken = require("../middleware/auth");
// POST: Apply for a job
const Job = require("../models/jobs"); // Import Job model if not already

router.post("/apply/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create and save the application with embedded job info
    const application = new Application({
      ...req.body,
      jobInfo: {
        jobId: job._id,
        jobTitle: job.title,
        jobDepartment: job.department,
        jobLocation: job.location,         // optional: add more job fields
        jobType: job.type,
      }
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: All applications (admin)
router.get("/applications", authenticateToken, async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Applications by Job ID
router.get("/applications/:jobId", authenticateToken, async (req, res) => {
  try {
    const apps = await Application.find({ _id: req.params.jobId });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
