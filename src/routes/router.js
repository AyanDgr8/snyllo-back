// routes/router.js
const express = require('express');
const router = express.Router();
const UserDetails = require('../models/landing');
// const PopupDetails = require('../models/popup');
require('dotenv').config();

// Define your routes
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


router.post('/submit-popup', async (req, res) => {
  try {
    console.log('Received popup submission:', req.body);
    const popup = new PopupDetails(req.body);
    const savedPopup = await popup.save();
    console.log('Popup details saved successfully:', savedPopup);
    res.json(savedPopup);
  } catch (error) {
    console.error('Error saving popup details:', error);
    res.status(500).json({ error: error.message });
  }
});


// Add more routes as needed
module.exports = router;
