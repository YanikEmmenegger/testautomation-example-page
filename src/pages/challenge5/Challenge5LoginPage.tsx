// src/pages/challenge5/Challenge5LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Login from "../../components/auth/login.tsx";

const Challenge3LoginPage: React.FC = () => {
    const { loginDelayed } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (username: string, password: string) => {
        setLoading(true);
        const success = await loginDelayed(username, password);
        if (success) {
            navigate("/challenge-5/kanban");
            setLoading(false);
        } else {
            setError("Invalid username or password");
            setLoading(false);
        }
    };

    return (
        <Login
            title="Challenge #5 Login"
            onSubmit={handleSubmit}
            errorMessage={error}
            loading={loading}
            withIds={true}
            withCustomClasses={true}
            id="challenge-5-login-page"
        />
    );
};

export default Challenge3LoginPage;
