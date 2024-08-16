const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  date: { type: Date, default: Date.now },
  pin: { type: String, required: true },
  participants: [{ studentId: mongoose.Schema.Types.ObjectId, status: String }], // Status can be 'checked', 'tried'
});

module.exports = mongoose.model('Session', SessionSchema);
