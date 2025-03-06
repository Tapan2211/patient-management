const patientModel = require('../model/patient.model');

//Add patient
const createPatient = async (data) => {
    return await patientModel.create(data);
}

//Get All Patients
const getAllPatients = async () => {
    return await patientModel.find();
}

//Get Single Patient
const getSinglePatient = async (id) => {
    return await patientModel.findById(id);
}

//Update Patient
const updatePatient = async (id, data) => {
    return await patientModel.findByIdAndUpdate(id, data, { new: true });
}

//Delete Patient
const deletePatient = async (id) => {
    return await patientModel.findByIdAndDelete(id);
}

// Enroll Patient
const enrollPatient = async (id) => {
    return await patientModel.findByIdAndUpdate(id, { enroll: true }, { new: true });
}

//Fetch Patient
const getPatients = async () => {
    const patients = await patientModel.find();
    const enrolledPatients = patients.filter(p => p.enrolled);
    const nonEnrolledPatients = patients.filter(p => !p.enrolled);
    return { enrolledPatients, nonEnrolledPatients };
}

module.exports = {
    createPatient,
    getAllPatients,
    getSinglePatient,
    updatePatient,
    deletePatient,
    enrollPatient,
    getPatients
}