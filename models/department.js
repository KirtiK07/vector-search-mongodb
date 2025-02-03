// models/department.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  departmentId: { type: String, required: true },
  name: { type: String, required: true },
  summary: { type: String, required: true },
  embedding: { type: [Number], default: [] }, // Store the embedding as an array of numbers
});

module.exports = mongoose.model('Department', departmentSchema);
