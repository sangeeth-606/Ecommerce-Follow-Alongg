const Cart = require("../models/cartschema");

const addToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.productId;
    const userEmail = req.body.userEmail; // Get userEmail from request body

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const removeFromCart = async (req, res) => {
//   const productId = req.params.productId;
//   const userEmail = req.body.userEmail;

//   if (!userEmail) {
//     return res.status(400).json({ message: "User email is required" });
//   }

//   try {
//     let cart = await Cart.findOne({ userEmail });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const itemIndex = cart.items.findIndex((item) => item.productId.equals(productId));

//     if (itemIndex === -1) {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     if (cart.items[itemIndex].quantity > 1) {
//       cart.items[itemIndex].quantity -= 1;
//     } else {
//       cart.items.splice(itemIndex, 1);
//     }

//     await cart.save();
//     res.status(200).json({ message: "Item removed from cart", cart });
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
const removeFromCart = async (req, res) => {
  const productId = req.params.productId;
  const { userEmail, quantity } = req.body; // Get quantity

  if (!userEmail) {
    return res.status(400).json({ message: "User email is required" });
  }

  try {
    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) => String(item.productId) === String(productId));

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cart.items[itemIndex].quantity > quantity) {
      cart.items[itemIndex].quantity -= quantity; // Decrease by the given quantity
    } else {
      cart.items.splice(itemIndex, 1); // Remove item if quantity reaches 0
    }

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const getCart = async (req, res) => {
    try {
      const userEmail = req.query.userEmail; // Get email from query params
  
      if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
      }
  
      const cart = await Cart.findOne({ userEmail }).populate("items.productId");
  
      if (!cart) {
        return res.status(200).json({ cart: [] });
      }
  
      res.status(200).json({ cart: cart.items });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // module.exports = { addToCart, getCart };
  
  
  
module.exports = { addToCart, getCart,removeFromCart };
