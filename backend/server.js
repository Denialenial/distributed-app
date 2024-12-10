const express = require('express');
const mongoose = require('mongoose');
const combinedRoutes = require('./routes/combinedRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
  origin: '*', // Temporarily allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // For parsing application/json

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected to Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit process on failure
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use('/api', combinedRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
