const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const Project = require("../models/project");
const multer = require("multer");
const fs = require("fs");
const ImageKit = require("imagekit");
const imagekit = new ImageKit({
  publicKey: "public_lT7FWLB4O0wjLOaJDz4BILaeQ3M=",
  privateKey: "private_ZHbZOed9A99mV5fblUnZO83pcPQ=",
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
});

// Multer Config - Use memory storage for Vercel compatibility
const upload = multer({ storage: multer.memoryStorage() });
router.get("/test", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
router.post("/upload-images", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = req.files.map((file) =>
      imagekit.upload({
        file: file.buffer, // Use buffer instead of reading from disk
        fileName: file.originalname,
      })
    );

    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.map((img) => img.url);

    // No need to delete temp files when using memory storage

    res.status(200).json({
      message: "Images uploaded successfully",
      images: imageUrls,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
});
router.post("/create-project", authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: "Project  title are required" });
    }

    // Check if project ID already exists
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return res.status(400).json({ message: "Project ID already exists" });
    }

    // Create new project
    const project = new Project(req.body);

    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
});
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().select("-__v").populate("_id");
    res.json({ message: "Projects retrieved successfully", projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving projects", error: error.message });
  }
});

// Protected Route: Get Project by ID
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project found successfully",
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      message: "Error retrieving project",
      error: error.message,
    });
  }
});

router.put("/projects/:id", authenticateToken, async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      longDescription,
      isFeatured,
      images,
      category,
      categoryIcon,
      status,
      tech,
      detailedTech,
      features,
      metrics,
      client,
      timeline,
      challenges,
      results,
      testimonial,
      year,
      links,
      gradient,
      nextProject,
      isVisible,
    } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Optional: Restrict update to creator
    // if (project.createdBy.toString() !== req.user.userId) {
    //   return res.status(403).json({ message: "Unauthorized to edit this project" });
    // }

    // Update fields
    project.title = title ?? project.title;
    project.subtitle = subtitle ?? project.subtitle;
    project.description = description ?? project.description;
    project.longDescription = longDescription ?? project.longDescription;
    project.isFeatured = isFeatured ?? project.isFeatured;
    project.images = images ?? project.images;
    project.category = category ?? project.category;
    project.categoryIcon = categoryIcon ?? project.categoryIcon;
    project.status = status ?? project.status;
    project.tech = tech ?? project.tech;
    project.detailedTech = detailedTech ?? project.detailedTech;
    project.features = features ?? project.features;
    project.metrics = metrics ?? project.metrics;
    project.client = client ?? project.client;
    project.timeline = timeline ?? project.timeline;
    project.challenges = challenges ?? project.challenges;
    project.results = results ?? project.results;
    project.testimonial = testimonial ?? project.testimonial;
    project.year = year ?? project.year;
    project.links = links ?? project.links;
    project.gradient = gradient ?? project.gradient;
    project.nextProject = nextProject ?? project.nextProject;
    project.isVisible = isVisible ?? project.isVisible;

    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Edit project error:", error);
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
});
router.delete("/projects/:id", authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Optional: only allow deletion by creator
    // if (project.createdBy.toString() !== req.user.userId) {
    //   return res.status(403).json({ message: "Unauthorized to delete this project" });
    // }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
});

module.exports = router;
