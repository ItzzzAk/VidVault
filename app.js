const express = require("express");
const path = require("path");
const mongoose = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const User = require("./models/User");
const Video = require("./models/Videos");
const flash = require("connect-flash");
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");
const indexRoutes = require("./routes/index");
const isLoggedin = require("./middleware/isLoggedin");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/videos", videoRoutes);

// Profile Route
// Profile Route
app.get("/profile", isLoggedin, async (req, res) => {
  try {
    // Fetch the user based on the ID from the decoded token
    const user = await User.findById(req.user.id);

    // Check if user exists
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/auth/login");
    }

    // Fetch videos for this user
    const videos = await Video.find({ userId: req.user.id });

    // Render the profile page
    res.render("profile", {
      userName: user.name, // Access user name safely
      userId: user.id,
      messages: req.flash("error"), // Ensure you're passing the messages
      successMessages: req.flash("success"),
      videos,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    req.flash("error", "Error loading profile");
    res.redirect("/");
  }
});

// Upload Route
// Upload Route
app.get("/upload", isLoggedin, async (req, res) => {
  try {
    // Fetch user based on the ID from the decoded token
    const user = await User.findById(req.user.id);

    // Check if user exists
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/auth/login"); // Redirect if user does not exist
    }

    const messages = req.flash("error");
    const successMessages = req.flash("success");

    // Render the upload page with user information
    res.render("upload", { userId: user.id, messages, successMessages });
  } catch (error) {
    console.error("Error fetching user for upload:", error);
    req.flash("error", "An error occurred while loading the upload page");
    res.redirect("/auth/login");
  }
});
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
