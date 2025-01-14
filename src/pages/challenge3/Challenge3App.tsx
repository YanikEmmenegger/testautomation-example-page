// src/pages/challenge1/Challenge2App.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Challenge3LoginPage from "./Challenge3LoginPage.tsx";
import TodoPage3 from "./TodoPage3.tsx";

function Challenge3App() {
    //change title to Challenge #3
    document.title = "Challenge #3";
    return (
        <Routes>
            {/* The default route -> check isLoggedIn -> /login or /todo */}
            <Route index element={<Navigate to="todo" replace />} />

            {/* /challenge-1/login */}
            <Route path="login" element={<Challenge3LoginPage />} />

            {/* /challenge-1/todo (protected) */}
            <Route
                path="todo"
                element={
                    <ProtectedRoute redirectPath="/challenge-3/login">
                        <TodoPage3 />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default Challenge3App;
