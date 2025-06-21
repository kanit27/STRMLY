const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Video = require("../models/video-model");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "strmly_videos",
    resource_type: "video",
    format: async (req, file) => "mp4",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    // Cloudinary transformations for optimization (e.g., lower quality, resize)
    transformation: [
      { quality: "auto:good" }, // auto quality
      { width: 480, crop: "limit" } // limit width to 480px
    ]
  },
});
const upload = multer({ storage });

// POST /api/upload
router.post("/upload", isLoggedIn, upload.single("video"), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !req.file) {
      return res.status(400).json({ error: "Title and video file are required" });
    }
    const video = await Video.create({
      title,
      description,
      videoUrl: req.file.path,
      uploader: req.user._id,
      uploaderName: req.user.fullname,
      uploadDate: new Date(),
    });
    res.status(201).json({ message: "Video uploaded", video });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/videos (with pagination)
router.get("/videos", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const videos = await Video.find()
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(limit)
      .select("title videoUrl uploaderName uploadDate");

    const total = await Video.countDocuments();
    res.json({
      videos,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/videos/recommended (5 random videos)
router.get("/videos/recommended", async (req, res) => {
  try {
    const count = await Video.countDocuments();
    const random = Math.max(0, Math.floor(Math.random() * (count - 5)));
    const videos = await Video.find()
      .skip(random)
      .limit(5)
      .select("title videoUrl uploaderName uploadDate");
    res.json({ videos });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/videos (all videos, fallback for old clients)
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ uploadDate: -1 })
      .select("title videoUrl uploaderName uploadDate");
    res.json({ videos });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;