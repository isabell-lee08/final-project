const mongoose = require('mongoose');

const crySchema = new mongoose.Schema({
    reason: String,
    date: String,
    tearsNum: String
});

module.exports = mongoose.model('Users', crySchema);