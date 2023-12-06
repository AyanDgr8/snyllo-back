// src/landing.js

const mongoose = require('mongoose');

const landingSchema = mongoose.Schema({
    name: { type: String, required: true, required: true },
    phone: { type: Number, required: true, required: true },
    email: { type: String, unique: true, required: true },
    treatment: { type: String, required: true, required: true },
    bodypart: { type: String, required: true, required: true },
    location: { type: String, required: true, required: true }
});


const UserDetails = mongoose.model("UserDetails", landingSchema)

module.exports = UserDetails;     