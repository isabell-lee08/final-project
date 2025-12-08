const mongoose = require('mongoose');

const crySchema = new mongoose.Schema({
  reason: String,
  date: String
});

module.exports = mongoose.model('Users', crySchema);