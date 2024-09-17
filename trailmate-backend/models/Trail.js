// models/Trail.js
const mongoose = require('mongoose');

const TrailSchema = new mongoose.Schema({
  id: String, // OSM ID
  name: String,
  description: String,
  coordinates: [[Number]],
  difficulty: String,
  surface: String,
  tags: Object,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  conditions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Condition' }],
});

module.exports = mongoose.model('Trail', TrailSchema);
