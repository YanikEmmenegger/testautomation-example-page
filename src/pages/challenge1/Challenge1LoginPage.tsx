// src/pages/challenge1/Challenge1LoginPage.tsx
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import Login from "../../components/auth/login.tsx";

const Challenge1LoginPage: React.FC = () => {
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [isTestMode, setIsTestMode] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const testMode = urlParams.get("test_mode");
        setIsTestMode(testMode !== null);
        if (isLoggedIn) {


            if (isTestMode) {
                navigate("/challenge-1/todo?test_mode=true");
            } else {
                navigate("/challenge-1/todo");
            }

        }
    });


    const [error, setError] = useState("");

    const handleSubmit = (username: string, password: string) => {
        const success = login(username, password);
        if (success) {
            if (isTestMode) {
                navigate("/challenge-1/todo?test_mode=true");
            } else {
                navigate("/challenge-1/todo");
            }
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
