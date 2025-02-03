// models/employee.js
const mongoose = require('mongoose');
const department = require('./department');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: { type: String, required: true },
  name: { type: String, required: true },
  introduction: { type: String, required: true },
  embedding: { type: [Number], default: [] }, // Store the embedding as an array of numbers
});

module.exports = mongoose.model('Employee', employeeSchema);
