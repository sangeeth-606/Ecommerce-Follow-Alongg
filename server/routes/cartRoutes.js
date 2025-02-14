const express = require("express");
const router = express.Router();
const { addToCart } = require("../controllers/cartController");

router.post("/addToCart/:productId", addToCart);

module.exports = router;
