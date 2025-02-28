const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('Patient', PatientSchema);