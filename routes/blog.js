const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
router.post("/create-blogs", authenticateToken, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create blog", error: error.message });
  }
});
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishDate: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
});
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Optionally increment view count
    blog.views += 1;
    await blog.save();

    res.status(200).json({ message: "Blog retrieved", blog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving blog", error: error.message });
  }
});
router.put("/blogs/:id", authenticateToken, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating blog",
      error: error.message,
    });
  }
});
router.delete("/blogs/:id", authenticateToken, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting blog",
      error: error.message,
    });
  }
});

module.exports = router;
