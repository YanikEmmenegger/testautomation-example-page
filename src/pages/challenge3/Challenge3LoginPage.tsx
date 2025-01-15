// src/pages/challenge3/Challenge3LoginPage.tsx
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Login from "../../components/auth/login.tsx";

const Challenge3LoginPage: React.FC = () => {
    const { loginDelayed, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/challenge-3/todo");
        }
    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (username: string, password: string) => {
        setLoading(true);
        const success = await loginDelayed(username, password);
        if (success) {
            navigate("/challenge-3/todo");
            setLoading(false);
        } else {
            setError("Invalid username or password");
            setLoading(false);
        }
    };

    return (
        <Login
            title="Challenge #3 Login"
            onSubmit={handleSubmit}
            errorMessage={error}
            loading={loading}
            withIds={true}
            withCustomClasses={true}
            id="challenge-1-login-page"
        />
    );
};

export default Challenge3LoginPage;
