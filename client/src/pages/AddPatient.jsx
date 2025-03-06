import React from 'react'
import PatientForm from "../components/PatientForm";
import { addPatient } from "../service/patientService";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
    const navigate = useNavigate();

    const handleSubmit = (patient) => {
        addPatient(patient).then(() => navigate("/"));
    };
    return <PatientForm onSubmit={handleSubmit} />;
}

export default AddPatient
