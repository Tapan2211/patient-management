import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientForm from "../components/PatientForm";
import { getAllPatients, updatePatient } from "../service/patientService";

const UpdatePatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        // Fetch all patients and find the one with matching id
        getAllPatients().then((patients) => {
            const patient = patients.find((p) => p._id === id);
            if (patient) setPatientData(patient);
        });
    }, [id]);

    const handleSubmit = (e, patient) => {
        e.preventDefault();
        updatePatient(id, patient).then(() => navigate("/"));
    };

    return (
        <>
            {patientData ? <PatientForm onSubmit={handleSubmit} initialData={patientData} /> : <p>Loading...</p>}
        </>
    );
};

export default UpdatePatient;
