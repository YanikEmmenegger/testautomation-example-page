import React, {FormEvent, useState} from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export interface LoginProps {
    /** Original optional id for the outer container */
    id?: string;
    className?: string;
    title?: string;
    onSubmit: (username: string, password: string) => void;
    errorMessage?: string;
    loading?: boolean;

    /**
     * If true, we include all 'id' attributes
     * (e.g. #login-username-input) and other test-friendly selectors
     */
    withIds?: boolean;

    /**
     * If true, we include certain non-Tailwind classes
     * (e.g. "input-login") for additional styling or test selectors
     */
    withCustomClasses?: boolean;
}

const Login: React.FC<LoginProps> = ({
                                         id,
                                         className,
                                         title = "Login",
                                         onSubmit,
                                         errorMessage,
                                            loading = false,
                                         withIds = true,          // Default to true if you'd like
                                         withCustomClasses = true // Default to true if you'd like
                                     }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    return (
        <div
            // Only render the 'id' if withIds is true
            id={withIds && id ? id : undefined}
            className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 ${
                className ?? ""
            }`}
        >
            <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded">
                {/* Conditionally include an ID */}
                <h2
                    id={withIds ? "login-form-title" : undefined}
                    className="text-2xl font-bold mb-4 text-center"
                >
                    {title}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            // only add htmlFor if we're using IDs
                            htmlFor={withIds ? "login-username-input" : undefined}
                            className="block mb-1 font-medium"
                        >
                            Username
                        </label>
                        <Input
                            disabled={loading}
                            // If withIds is false, set id to undefined
                            id={withIds ? "login-username-input" : undefined}
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            // Conditionally add custom class
                            className={`w-full ${
                                withCustomClasses ? "input-login" : ""
                            }`}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor={withIds ? "login-password-input" : undefined}
                            className="block mb-1 font-medium"
                        >
                            Password
                        </label>
                        <Input
                            disabled={loading}
                            id={withIds ? "login-password-input" : undefined}
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {errorMessage && (
                        <p
                            id={withIds ? "login-error-message" : undefined}
                            className="text-red-600 mb-4"
                        >
                            {errorMessage}
                        </p>
                    )}

                    <Button
                        id={withIds ? "login-submit-button" : undefined}
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2"
                    >
                        {
                            loading ? "logging in..." : "Login"
                        }
                    </Button>
                </form>
            </div>
            <a className={"fixed top-2 left-2"} href={"/"}>
                <Button>
                    Home
                </Button>
            </a>
        </div>
    );
};

export default Login;
