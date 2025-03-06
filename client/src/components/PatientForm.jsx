import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const PatientForm = ({ onSubmit, initialData = {} }) => {
    const [patient, setPatient] = useState({
        name: initialData.name || "",
        dateOfBirth: initialData.dateOfBirth || "",
        address: initialData.address || "",
        phone: initialData.phone || "",
        image: null,
    });

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setPatient({ ...patient, image: e.target.files[0] });
    };

    // ✅ Ensure event is handled correctly
    const handleSubmit = (e) => {
        e.preventDefault(); // ✅ Prevent form submission

        const formData = new FormData();
        formData.append("name", patient.name);
        formData.append("dob", patient.dateOfBirth);
        formData.append("address", patient.address);
        formData.append("phone", patient.phone);

        if (patient.image) {
            formData.append("image", patient.image);
        }

        if (typeof onSubmit === "function") {
            onSubmit(formData); // ✅ Correctly pass formData to `AddPatient`
        }
    };

    return (
        <Box sx={{ margin: "20px auto", padding: 2, backgroundColor: "#fff", borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <TextField label="Name" name="name" value={patient.name} onChange={handleChange} fullWidth required sx={{ marginBottom: 2 }} />
                <TextField type="date" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} fullWidth required sx={{ marginBottom: 2 }} />
                <TextField label="Address" name="address" value={patient.address} onChange={handleChange} fullWidth required sx={{ marginBottom: 2 }} />
                <TextField label="Phone" name="phone" value={patient.phone} onChange={handleChange} fullWidth required sx={{ marginBottom: 2 }} />

                <input type="file" name="image" accept="image/*" onChange={handleFileChange} style={{ marginBottom: 10 }} />

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default PatientForm;
