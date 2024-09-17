// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  preferences: Object,
  hikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trail' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
});

module.exports = mongoose.model('User', UserSchema);
