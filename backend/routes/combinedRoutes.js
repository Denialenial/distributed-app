const express = require('express');
const router = express.Router();
const CombinedController = require('../controllers/combinedController');

// Inventory Routes
router.get('/inventories', CombinedController.getInventories);
router.post('/inventories', CombinedController.addInventory);
router.delete('/inventories/:id', CombinedController.deleteInventory);
router.put('/inventories/:id', CombinedController.updateInventory);

// Employee Routes
router.get('/employees', CombinedController.getEmployees);
router.post('/employees', CombinedController.addEmployee);
router.delete('/employees/:id', CombinedController.deleteEmployee);
router.put('/employees/:id', CombinedController.updateEmployee);

// Event Routes
router.get('/events', CombinedController.getEvents);
router.post('/events', CombinedController.addEvent);
router.delete('/events/:id', CombinedController.deleteEvent);
router.put('/events/:id', CombinedController.updateEvent);

module.exports = router;
