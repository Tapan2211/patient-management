import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import AddPatient from "./pages/AddPatient";
import UpdatePatient from "./pages/UpdatePatient";
import PatientList from "./pages/PatientList";
import EnrolledPatients from "./pages/EnrolledPatients";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider, { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><PatientList /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddPatient /></ProtectedRoute>} />
          <Route path="/update/:id" element={<ProtectedRoute><UpdatePatient /></ProtectedRoute>} />
          <Route path="/enrolled" element={<ProtectedRoute><EnrolledPatients /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;