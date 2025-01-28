const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors()); 

let connection = mongoose.connect(process.env.MONGODB_URI);

app.get("/ping", (req, res) => {
    res.send("pong");
});
app.use('/', userRoutes);
app.use('/', uploadRoutes);
app.use('/', productRoutes);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log(error);
    }

    console.log(`Serverr is running on port ${PORT}`);
});