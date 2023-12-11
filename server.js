// server.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./logger');
const UserDetails = require('./src/landing');
require('dotenv').config();

const app = express();
app.use(express.json());

// Set up Morgan middleware for HTTP request logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Enable CORS
app.use(cors());

// MongoDB connection
const { mongoDB } = process.env;

mongoose.connect(mongoDB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
  .then(() => {
    logger.info('MongoDB connected successfully');
  })
  .catch((error) => {
    logger.error('MongoDB connection failed:', error);
  });

// Define a route to handle form submissions
app.post('/user-details', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const user = new UserDetails(req.body);
    const savedUser = await user.save();
    console.log('User details saved successfully:', savedUser);
    res.json(savedUser);
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
