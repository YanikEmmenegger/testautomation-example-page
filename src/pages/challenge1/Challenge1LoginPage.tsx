// src/pages/challenge1/Challenge2LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Login from "../../components/auth/login.tsx";

const Challenge1LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = (username: string, password: string) => {
        const success = login(username, password);
        if (success) {
            navigate("/challenge-1/todo");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <Login
            title="Challenge #1 Login"
            onSubmit={handleSubmit}
            errorMessage={error}
            id="challenge-1-login-page"
        />
    );
};

export default Challenge1LoginPage;