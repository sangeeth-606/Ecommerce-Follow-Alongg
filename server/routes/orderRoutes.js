const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController'); // Adjust path based on your project structure

// Create a new order
router.post('/create', createOrder);

// Get all orders for a user
router.get('/user-orders', getUserOrders);

module.exports = router;