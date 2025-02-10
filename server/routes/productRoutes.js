
const express = require('express');
const { createProduct, uploadImages,getProducts, updateProduct, getProductById } = require('../controllers/productController'); 
const router = express.Router();

router.post('/createProduct', uploadImages, createProduct); 
router.get("/getProducts/", getProducts);
router.put("/updateProduct/:id",updateProduct);
router.get("/getProduct/:id", getProductById);

module.exports = router;
