// Routes.js
const express = require('express');
const UserDetails = require('./src/landing');

const router = express.Router();

router.post('/user-details', async (req, res) => {
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

module.exports = router;
