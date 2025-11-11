import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import blogRoutes from "./routes/blog.js";
import jobsRoutes from "./routes/jobs.js";
import documentRoutes from "./routes/upload.js";
import jobApplicationRoutes from "./routes/applications.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (optional)
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ Mongo error:", err));
}

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Example route
app.get("/api/test", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/upload", documentRoutes);
app.use("/api/application", jobApplicationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
