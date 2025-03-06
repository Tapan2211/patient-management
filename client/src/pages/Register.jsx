import React, { useState } from "react";
import { registerUser } from "../service/authService";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password });
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                </form>
                <Box textAlign="center" mt={2}>
                    <Typography variant="body2">
                        Already have an account? <Button component={Link} to="/login">Login</Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default Register;
