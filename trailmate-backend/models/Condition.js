// models/Condition.js
const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trail: { type: String }, // Use trail ID from OSM
  status: String, // e.g., 'Open', 'Closed', 'Muddy', 'Snowy'
  description: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Condition', ConditionSchema);

