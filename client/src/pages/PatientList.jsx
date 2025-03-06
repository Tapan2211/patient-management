import React, { useEffect, useState } from 'react'
import { getAllPatients, deletePatient, enrollPatient } from '../service/patientService';
import PatientTable from '../components/PatientTable';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        const data = await getAllPatients();
        setPatients(data);
    };

    const handleDelete = async (id) => {
        await deletePatient(id);
        setPatients((prev) => prev.filter((p) => p._id !== id));
    };

    const handleEnroll = async (id) => {
        try {
            const updatedPatient = await enrollPatient(id);

            if (!updatedPatient || typeof updatedPatient.enrolled === 'undefined') {
                console.error("Error: API did not return updated patient data.");
                return;
            }

            setPatients((prev) =>
                prev.map((p) =>
                    p._id === id ? { ...p, enrolled: updatedPatient.enrolled } : p
                )
            );
        } catch (error) {
            console.error("Error enrolling patient:", error);
        }
    };


    // const handleEnroll = async (id) => {
    //     const updatedPatient = await enrollPatient(id); // API should return updated patient
    //     setPatients((prev) =>
    //         prev.map((p) =>
    //             p._id === id ? { ...p, enrolled: updatedPatient.enrolled } : p
    //         )
    //     );
    //     // await enrollPatient(id);
    //     // setPatients((prev) => prev.filter((p) => p._id !== id));
    // };


    return <PatientTable patients={patients} onDelete={handleDelete} onEnroll={handleEnroll} />

}

export default PatientList
