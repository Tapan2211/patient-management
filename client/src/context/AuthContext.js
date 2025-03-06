import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const getUserFromStorage = () => {
    try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
};

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState(getUserFromStorage);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = getUserFromStorage();

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData)); // Ensure userData is JSON safe
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
