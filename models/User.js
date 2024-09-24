// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }], // Associate videos with user
});

module.exports = mongoose.model('User', UserSchema);