const mongoose = require("mongoose");
require("dotenv").config();


const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "vidVault" // Ensure only vidVault database is created
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = mongoose.connection;
