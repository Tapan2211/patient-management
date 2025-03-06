import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PatientTable = ({ patients, onDelete, onEnroll }) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Enroll</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    patients.map((p) => (
                        <TableRow key={p._id}>
                            <TableCell>
                                <img src={p.image} alt={p.name} style={{ width: 50, height: 50 }} />
                            </TableCell>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.dob}</TableCell>
                            <TableCell>{p.address}</TableCell>
                            <TableCell>{p.enrolled ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{p.phone}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" component={Link} to={`/update/${p._id}`}>Edit</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => onDelete(p._id)}>Delete</Button>
                            </TableCell>

                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => onEnroll(p._id)}>Enroll</Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default PatientTable
