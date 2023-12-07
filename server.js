// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const UserDetails = require('./src/landing');

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
