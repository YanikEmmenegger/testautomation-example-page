// src/pages/challenge2/Challenge2App.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Challenge2LoginPage from "./Challenge2LoginPage.tsx";
import TodoPage2 from "./TodoPage2.tsx";

function Challenge2App() {
    document.title = "Challenge #2";
    return (
        <Routes>
            {/* The default route -> check isLoggedIn -> /login or /todo */}
            <Route index element={<Navigate to="todo" replace />} />

            {/* /challenge-2/login */}
            <Route path="login" element={<Challenge2LoginPage />} />

            {/* /challenge-2/todo (protected) */}
            <Route
                path="todo"
                element={
                    <ProtectedRoute redirectPath="/challenge-2/login">
                        <TodoPage2 />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default Challenge2App;
