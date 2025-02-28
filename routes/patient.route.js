const express = require('express');
const patientModel = require('../model/patient.model');
const router = express.Router();

//Add Patient 
router.post('/', async (req, res) => {
    try {
        const newPatient = new patientModel(req.body);
        const savedPatient = await newPatient.save();
        res.json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get All Patients
router.get('/', async (req, res) => {
    try {
        const patients = await patientModel.find();
        res.json(patients);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get Single Patient
router.get('/:id', getPatient, (req, res) => {
    res.json(res.patient);
});

//Update Patient
router.patch('/:id', getPatient, async (req, res) => {
    if (req.body.name || req.body.dob || req.body.address || req.body.phone) {
        res.patient.name = req.body.name;
        res.patient.dob = req.body.dob;
        res.patient.address = req.body.address;
        res.patient.phone = req.body.phone;

        try {
            const updatedPatient = await res.patient.save();
            res.json(updatedPatient);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(400).json({ message: 'No valid updates provided' });
    }
});

//Delete Patient
router.delete('/:id', getPatient, async (req, res) => {
    try {
        await res.patient.remove();
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
