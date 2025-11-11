// routes/jobs.js
const express = require("express");
const router = express.Router();
const Job = require("../models/jobs");
const authenticateToken = require("../middleware/auth");
// Create Job
router.post("/create-job", authenticateToken, async (req, res) => {
  try {
    const { title, department, location } = req.body;

    // Check if a job with same title, department, and location exists
    const existingJob = await Job.findOne({ title, department, location });

    if (existingJob) {
      return res.status(409).json({
        message:
          "Job with same title, department, and location already exists.",
      });
    }

    const job = new Job(req.body);
    await job.save();

    res.status(201).json({ message: "Job created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Jobs
router.get("/job", async (req, res) => {
  const jobs = await Job.find().sort({ datePosted: -1 });
  res.json(jobs);
});

// Get Single Job
router.get("/job/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Job
router.put("/job/:id", authenticateToken, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job edit successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Job
router.delete("/job/:id", authenticateToken, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
