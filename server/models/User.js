const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Student' }, // Can be 'Admin', 'Teacher', 'Student'
});

module.exports = mongoose.model('User', UserSchema);
