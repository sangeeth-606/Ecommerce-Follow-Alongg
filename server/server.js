
// });
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const profileRoutes = require('./routes/profile');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8080;


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  credentials: true
}));
// ...existing code...
// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

// MongoDB connection
let connection = mongoose.connect(process.env.MONGODB_URI);

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Routes
app.use('/', userRoutes);
app.use('/', uploadRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/api/v1/profile', profileRoutes);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${PORT}`);
});