const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    enrolled: { type: Boolean, default: false },
    image: { type: String }
},
    { timestamps: true }
);

module.exports = mongoose.model('Patient', PatientSchema);