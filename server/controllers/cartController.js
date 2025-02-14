const Cart = require("../models/cartschema");


const addToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.productId; // Get productId from URL
    const userEmail = req.headers.useremail; // Get userEmail from request headers

    if (!userEmail || !productId) {
      return res.status(400).json({ error: "Missing userEmail or productId" });
    }

    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart: cart.items });
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
};

module.exports = { addToCart };
