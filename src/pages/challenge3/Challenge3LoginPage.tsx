// src/pages/challenge3/LoginPage3.tsx
import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const LoginPage3: React.FC = () => {
    const {loginDelayed} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const success = await loginDelayed(username, password);
        if (success) {
            navigate("/challenge-3/todo");
        } else {
            setError("Invalid username or password");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
            <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded">
                <h2 className="text-2xl font-bold mb-4 text-center">Login (Challenge #3)</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Username</label>
                        <Input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full"
                            disabled={loading} // disable if cookie not accepted or loading
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Password</label>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <Button
                        type="submit"
                        className="w-full mt-2 bg-blue-600 text-white"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage3;
