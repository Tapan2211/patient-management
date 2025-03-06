import React, { useEffect, useState } from "react";
import { getEnrolledPatients } from "../service/patientService";
import { Table, TableHead, Button, TableRow, TableCell, TableBody, Paper } from "@mui/material";

const EnrolledPatients = () => {
    const [enrolledPatients, setEnrolledPatients] = useState([]);

    useEffect(() => {
        fetchEnrolledPatients();
    }, []);

    const fetchEnrolledPatients = async () => {
        const data = await getEnrolledPatients();
        setEnrolledPatients(data);
    };


    return (
        <Paper >
            <h2>Enrolled Patients</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                        {/* <TableCell ></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {enrolledPatients.map((patient) => (
                        <TableRow key={patient._id}>
                            <TableCell>
                                <img src={patient.image} alt={patient.name} style={{ width: 50, height: 50 }} />
                            </TableCell>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.dob}</TableCell>
                            <TableCell>{patient.address}</TableCell>
                            <TableCell>{patient.phone}</TableCell>

                            {/* <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => onDelete(p._id)}>Delete</Button>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default EnrolledPatients;
