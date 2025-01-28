// const express=require('express');
// const {createProduct} = require('../controllers/productController');
// const router=express.Router();

// router.post('/createProduct',createProduct);

// module.exports=router;

const express = require('express');
const { createProduct, uploadImages } = require('../controllers/productController'); 
const router = express.Router();

// POST route to create a product with image uploads
router.post('/createProduct', uploadImages, createProduct); 

module.exports = router;
