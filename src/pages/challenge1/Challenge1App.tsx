// src/pages/challenge1/Challenge2App.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Challenge1LoginPage from "./Challenge1LoginPage";
import TodoPage from "./TodoPage";

function Challenge1App() {
    return (
        <Routes>
            {/* The default route -> check isLoggedIn -> /login or /todo */}
            <Route index element={<Navigate to="todo" replace />} />

            {/* /challenge-1/login */}
            <Route path="login" element={<Challenge1LoginPage />} />

            {/* /challenge-1/todo (protected) */}
            <Route
                path="todo"
                element={
                    <ProtectedRoute redirectPath="/challenge-1/login">
                        <TodoPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default Challenge1App;
