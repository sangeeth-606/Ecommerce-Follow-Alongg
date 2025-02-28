const Order = require('../models/order'); 
const User = require('../models/user'); 

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, address } = req.body;

    // Validate required fields
    if (!userId || !products || !totalPrice || !address) {
      return res.status(400).json({ success: false, message: "User ID, products, total price, and address are required" });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create new order
    const order = new Order({
      user: userId,
      products,
      totalPrice,
      address,
      status: 'pending',
    });

    const savedOrder = await order.save();

    res.status(201).json({ success: true, order: savedOrder });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ success: false, message: "Error creating order", error: err.message });
  }
};

// Get orders for a user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const orders = await Order.find({ user: userId })
      .populate('products.productId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, message: "Error fetching orders", error: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};