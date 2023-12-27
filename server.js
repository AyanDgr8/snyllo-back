// server.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./logger');
const routes = require('./src/routes/router'); 
require('dotenv').config();

const app = express();
app.use(express.json());

// Set up Morgan middleware for HTTP request logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Enable CORS
app.use(cors());

// MongoDB connection
const mongoDB = process.env.MONGODB;
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

// Use the routes defined in the external module
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
