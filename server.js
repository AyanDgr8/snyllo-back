// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const routes = require('./Routes'); 

const app = express();
app.use(cors());
app.use(express.json());

const { mongoDB, SERVER_SELECTION_TIMEOUT, SOCKET_TIMEOUT } = process.env;

mongoose.connect(mongoDB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT || 30000,
    socketTimeoutMS: SOCKET_TIMEOUT || 45000,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('MongoDB connection failed:', error);
});

// Use the Routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
