// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: String,
  location: String,
  type: String,
  salary: String,
  description: String,
  requirements: [String],
  responsibilities: [String],
  featured: Boolean,
  status: { type: String, enum: ['open', 'closed','draft'], default: 'open' },
  applications: { type: Number, default: 0 },
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
