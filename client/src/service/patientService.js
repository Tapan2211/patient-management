import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8081/api/v1/patient';

// Get All Patient
export const getAllPatients = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        toast.error('Failed to fetch patients');
        return [];
    }
}

// Add Patient
export const addPatient = async (patient) => {
    try {
        await axios.post(`${API_URL}/create`, patient, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        toast.success("Patient added successfully!");
    } catch (error) {
        console.error("Error response:", error.response?.data);
        toast.error('Failed to add patient');
    }
}

// Update Patient
export const updatePatient = async (id, patient) => {
    try {
        await axios.put(`${API_URL}/${id}`, patient, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        toast.success("Patient updated successfully!");
    } catch (error) {
        console.error("Error response:", error.response?.data);
        toast.error(error.response?.data?.message || 'Failed to update patient');
    }
}

// Delete Patient
export const deletePatient = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success("Patient deleted successfully!");
    } catch (error) {
        toast.error('Failed to delete patient');
    }
}

//Enroll Patient
export const enrollPatient = async (id) => {
    try {
        await axios.put(`${API_URL}/enrolled/${id}`);
        toast.success("Patient enrolled successfully!");
    } catch (error) {
        toast.error("Failed to enroll patient");
    }
}

// Get Enroll patient
export const getEnrolledPatients = async () => {
    try {
        const response = await axios.get(`${API_URL}/enrolled`);
        return response.data.data;
    } catch (error) {
        toast.error("Failed to fetch enrolled patients");
        return [];
    }
}