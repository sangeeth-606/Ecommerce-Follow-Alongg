// const express = require('express');
// const mongoose = require('mongoose');
// const uploadRoutes = require('./routes/uploadRoutes');
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());
// // app.options('*', cors()); // Allow preflight requests

// app.use('/uploads', express.static('uploads'));

// let connection = mongoose.connect(process.env.MONGODB_URI);

// app.get("/ping", (req, res) => {
//     res.send("pong");
// });
// app.use('/', userRoutes);
// app.use('/', uploadRoutes);
// app.use('/', productRoutes);
// app.use('/', cartRoutes)

// app.listen(PORT, async () => {
//     try {
//         await connection;
//         console.log("Successfully connected to MongoDB");
//     } catch (error) {
//         console.log(error);
//     }

//     console.log(`Serverr is running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8080;

// CORS configuration
// const corsOptions = {
//   origin: 'http://localhost:5173', // Removed trailing slash
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   credentials: true // Enables cookies or auth headers if needed
// };

// app.use(cors({
//     origin: (origin, callback) => {
//       console.log('Request Origin:', origin);
//       if (origin === 'http://localhost:5174') {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     credentials: true
//   }));
// ...existing code...
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

app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${PORT}`);
});