const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true }, // URL of the video stored in Firebase
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", videoSchema);
