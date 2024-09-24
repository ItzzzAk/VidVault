// backend/controllers/videoController.js
const { bucket } = require("../config/firebase");
const Video = require("../models/Videos"); // MongoDB model for video metadata
const User = require("../models/User"); // MongoDB model for user
const { v4: uuidv4 } = require("uuid"); // For generating unique filenames
const Joi = require("joi"); // For validation

const supportedVideoMimeTypes = [
  "video/mp4",
  "video/avi",
  "video/mkv",
  "video/mpeg",
  "video/webm",
  "video/ogg",
];

// Upload Video
exports.uploadVideo = async (req, res) => {
  try {
    
    const schema = Joi.object({
      caption: Joi.string().required(),
      videoFile: Joi.object().required(), // Changed to just check that videoFile exists
    });

    // Validate the uploaded video and caption
    const { error } = schema.validate({
      caption: req.body.caption,
      videoFile: req.file,
    });

    if (error) {
      console.log("Validation Error:", error.details);
      req.flash("error", "Invalid video file uploaded");
      return res.redirect("/upload");
    }

    const { caption } = req.body;
    const videoFile = req.file;

    // Check if the file exists
    if (!videoFile) {
      req.flash("error", "No video file uploaded");
      return res.redirect("/upload");
    }

    // Check if the uploaded file is a video
    if (!supportedVideoMimeTypes.includes(videoFile.mimetype)) {
      req.flash("error", "Only video files are allowed");
      return res.redirect("/upload");
    }

    // Generate a unique name for the video
    const videoName = `${uuidv4()}_${videoFile.originalname}`;

    // Upload video to Firebase Storage
    const blob = bucket.file(videoName);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: videoFile.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.error(err);
      req.flash("error", "Video upload failed");
      return res.redirect("/upload");
    });

    blobStream.on("finish", async () => {
      // Generate the public URL for the video in the correct format
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(videoName)}?alt=media`;

      // Store video metadata in MongoDB
      const video = new Video({
        url: publicUrl,
        caption,
        userId: req.user.id,
      });

      await video.save();

      // Update user's videos array
      await User.findByIdAndUpdate(req.user.id, {
        $push: { videos: video._id },
      });

      req.flash("success", "Video uploaded successfully");
      res.redirect("/profile");
    });

    blobStream.end(videoFile.buffer);
  } catch (error) {
    console.error("Error during upload:", error);
    req.flash("error", "An error occurred");
    res.redirect("/upload");
  }
};

// Get User Videos
exports.getUserVideos = async (req, res) => {
  try {
    // Fetch the videos that belong to the logged-in user
    const videos = await Video.find({ userId: req.user.id });

    // Render the profile page and pass the videos array and user information
    res.render("profile", { videos: videos, userName: req.user.name, messages: req.flash("error"), successMessages: req.flash("success") });
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to retrieve videos");
    res.redirect("/");
  }
};

// Get Edit Video Form
exports.getEditVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      req.flash("error", "Video not found");
      return res.redirect("/profile");
    }
    req.flash("success", "Video loaded successfully for editing");
    res.render("edit", { video, userId: req.user.id, messages: req.flash("error"), successMessages: req.flash("success") });
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to load video for editing");
    res.redirect("/profile");
  }
};

// Update Video Caption
exports.updateVideoCaption = async (req, res) => {
  try {
    const { caption } = req.body;
    await Video.findByIdAndUpdate(req.params.id, { caption });
    req.flash("success", "Caption updated successfully");
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to update caption");
    res.redirect("/profile");
  }
};

// Delete Video
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    req.flash("success", "Video deleted successfully");
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to delete video");
    res.redirect("/profile");
  }
};
