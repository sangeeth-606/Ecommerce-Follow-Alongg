// filepath: /home/zape/sange/Desktop/Ecommerce-Follow-Alongg/server/server.js
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8084;
app.use(express.json());
app.use(cors());
console.log(process.env.MONGODB_URI)
let connection = mongoose.connect(process.env.MONGODB_URI);

app.get("/ping", (req, res) => {
    res.send("pong");
});
app.use('/', userRoutes);
app.use('/', uploadRoutes);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log(error);
    }

    console.log(`Serverr is running on port ${PORT}`);
});