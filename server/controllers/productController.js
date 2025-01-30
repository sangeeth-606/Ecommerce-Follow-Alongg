
const Product = require("../models/product");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname); 
    },
});

const upload = multer({ storage: storage });


const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        
        if (!name || !description || !price || !category || !req.files) {
            return res.status(400).json({ message: "All fields and images are required" });
        }

        
        const images = req.files.map(file => `uploads/${file.filename}`);

        
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images, 
        });

        
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating product" });
    }
};

// middleware to upload images
const uploadImages = upload.array("images"); 



//milestone 12
const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};

module.exports = { createProduct, uploadImages,getProducts };
