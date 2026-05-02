const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Scheme', 'Alert', 'Meeting', 'Agriculture', 'Other']
  },
  date: {
    type: String, // Storing as formatted string for simplicity, or Date
    required: true
  },
  hasAttachment: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
