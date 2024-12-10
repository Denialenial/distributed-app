const { Inventory, Employee, Event } = require('../models/combinedModel');
const mongoose = require('mongoose');

// Inventory Controller Functions
const getInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.json(inventories);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching inventories', error: err });
  }
};

const addInventory = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const newInventory = new Inventory({ name, quantity, price });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (err) {
    res.status(500).send({ message: 'Error adding inventory', error: err });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID format' });
    }
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return res.status(404).send({ message: 'Inventory not found' });
    }
    res.json({ message: 'Inventory deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting inventory', error: err });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID format' });
    }
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true }
    );
    if (!updatedInventory) {
      return res.status(404).send({ message: 'Inventory not found' });
    }
    res.json(updatedInventory);
  } catch (err) {
    res.status(500).send({ message: 'Error updating inventory', error: err });
  }
};

// Employee Controller Functions
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching employees', error: err });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, position, department, salary } = req.body;
    const newEmployee = new Employee({ name, position, department, salary });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).send({ message: 'Error adding employee', error: err });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID format' });
    }
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting employee', error: err });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, department, salary } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID format' });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, position, department, salary },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).send({ message: 'Error updating employee', error: err });
  }
};

// Event Controller Functions
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching events', error: err });
  }
};

const addEvent = async (req, res) => {
  try {
    const { name, description, date, location, attendees } = req.body;
    const newEvent = new Event({ name, description, date, location, attendees });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).send({ message: 'Error adding event', error: err });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID format' });
    }
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting event', error: err });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, location, attendees } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID format' });
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, description, date, location, attendees },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).send({ message: 'Error updating event', error: err });
  }
};

module.exports = {
  getInventories,
  addInventory,
  deleteInventory,
  updateInventory,
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  getEvents,
  addEvent,
  deleteEvent,
  updateEvent
};
