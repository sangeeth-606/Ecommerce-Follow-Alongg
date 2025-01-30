
const express = require('express');
const { createProduct, uploadImages,getProducts } = require('../controllers/productController'); 
const router = express.Router();

router.post('/createProduct', uploadImages, createProduct); 
router.get("/getProducts", getProducts);


module.exports = router;
