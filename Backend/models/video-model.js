const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  uploaderName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", videoSchema);