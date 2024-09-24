// backend/routes/videos.js
const express = require("express");
const {
  uploadVideo,
  updateVideoCaption,
  getEditVideo,
  deleteVideo,
} = require("../controllers/videoController");
const isLoggedIn = require("../middleware/isLoggedin");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Protect routes
router.use(isLoggedIn);

// Upload Video
router.post("/upload-vid", upload.single("video"), async (req, res) => {
  try {
    await uploadVideo(req, res);
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to upload video");
    res.redirect("/profile");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    await getEditVideo(req, res);
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to load edit page");
    res.redirect("/profile");
  }
});

// Route to handle updating the video caption
router.post("/edit/:id", async (req, res) => {
  try {
    await updateVideoCaption(req, res);
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to update caption");
    res.redirect("/profile");
  }
});

// Route to handle deleting the video
router.get("/delete/:id", async (req, res) => {
  try {
    await deleteVideo(req, res);
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to delete video");
    res.redirect("/profile");
  }
});

module.exports = router;
