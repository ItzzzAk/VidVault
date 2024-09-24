const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    let userId = null;
    if (req.cookies.token) {
      try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        req.flash("error", "Invalid token");
        return res.redirect("/auth/login");
      }
    }
    res.render("index", {
      messages: req.flash("error"),
      successMessages: req.flash("success"),
      userId,
    });
  } catch (error) {
    req.flash("error", "An error occurred while loading the page");
    res.redirect("/auth/login");
  }
});

module.exports = router;
