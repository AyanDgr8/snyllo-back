// src/models/popup.js

const mongoose = require('mongoose');

const popupSchema = mongoose.Schema({
    phoneNumber: { type: Number, required: true },
    treatmentType: { type: String, required: true },
});


const PopupDetails = mongoose.model("PopupDetails", popupSchema)

module.exports = PopupDetails;     