const mongoose = require('mongoose');

// Inventory Schema
const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true }
}, { timestamps: true });

// Event Schema
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  attendees: { type: Number, required: true }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = { Inventory, Employee, Event };
