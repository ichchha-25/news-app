const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  source_url: String
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);