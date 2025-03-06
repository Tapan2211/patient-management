const patientService = require('../services/patient.service');
const patientModel = require("../model/patient.model");

// Create Patient
const createPatient = async (req, res) => {
    try {
        console.log("Received data:", req.body);  // Debugging line

        // Check if all required fields are provided
        const { name, dob, address, phone } = req.body;
        if (!name || !dob || !address || !phone) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Construct full image URL (Check if file is uploaded)
        const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;


        // Create a new patient with image URL
        const newPatient = {
            name,
            dob,
            address,
            phone,
            enrolled: false,
            image: imageUrl,  // Store image path
        };

        const result = await patientService.createPatient(newPatient);
        res.status(201).json({ success: true, message: 'Patient created successfully', data: result });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// Get All Patient
const getAllPatients = async (req, res) => {
    try {
        const result = await patientService.getAllPatients();
        if (result.length > 0) {
            res.status(200).json({ success: true, message: 'Patients retrieved successfully', data: result });
        } else {
            res.status(200).json({ success: true, message: 'No patients found', data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get Single Patient
const getSinglePatient = async (req, res) => {
    try {
        const result = await patientService.getSinglePatient(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.status(200).json({ success: true, message: 'Patient retrieved successfully', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update Patient
const updatePatient = async (req, res) => {
    try {
        const result = await patientService.updatePatient(req.params.id, req.body);
        res.status(200).json({ success: true, message: 'Patient updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Delete Patient
const deletePatient = async (req, res) => {
    try {
        const result = await patientService.deletePatient(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.status(200).json({ success: true, message: 'Patient deleted successfully', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Enroll Patient
const enrollPatient = async (req, res) => {
    try {
        const patient = await patientService.updatePatient(req.params.id, { enrolled: true });
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }
        res.status(200).json({ success: true, message: "Patient enrolled successfully", data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get only enrolled patients
const getEnrolledPatients = async (req, res) => {
    try {
        const enrolledPatients = await patientModel.find({ enrolled: true });  // ✅ Use patientModel
        res.status(200).json({ success: true, data: enrolledPatients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getSinglePatient,
    updatePatient,
    deletePatient,
    enrollPatient,
    getEnrolledPatients,
}