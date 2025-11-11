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

// MongoDB connection with proper error handling and timeouts
let mongoConnected = false;

const connectMongoDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI not set. Running without database.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds to select a server
      connectTimeoutMS: 10000, // 10 seconds to connect
      socketTimeoutMS: 45000, // 45 seconds for socket operations
      retryWrites: true,
      w: "majority",
    });
    mongoConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    mongoConnected = false;
    // Retry connection after 5 seconds
    setTimeout(connectMongoDB, 5000);
  }
};

// Start MongoDB connection immediately
connectMongoDB();

// Middleware to check database connection status
app.use((req, res, next) => {
  if (!mongoConnected && req.path.startsWith("/api/")) {
    return res.status(503).json({
      message: "Database is not connected. Please try again later.",
      status: "unavailable",
    });
  }
  next();
});

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
