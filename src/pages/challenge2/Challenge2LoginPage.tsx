// src/pages/challenge2/Challenge2LoginPage.tsx
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import Login from "../../components/auth/login.tsx";

const Challenge2LoginPage: React.FC = () => {
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/challenge-2/todo");
        }
    });

    const [error, setError] = useState("");

    const handleSubmit = (username: string, password: string) => {
        const success = login(username, password);
        if (success) {
            navigate("/challenge-2/todo");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <Login withIds={false}
               withCustomClasses={false}
            title="Challenge #2 Login"
            onSubmit={handleSubmit}
            errorMessage={error}
        />
    );
};

export default Challenge2LoginPage;
