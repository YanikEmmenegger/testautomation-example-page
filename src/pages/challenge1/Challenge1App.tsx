// src/pages/challenge1/Challenge2App.tsx
import {Navigate, Route, Routes} from "react-router-dom";
import Challenge1LoginPage from "./Challenge1LoginPage";
import TodoPage from "./TodoPage";

function Challenge1App() {
    document.title = "Challenge #1";

    return (
        <Routes>
            {/* The default route -> check isLoggedIn -> /login or /todo */}
            <Route index element={<Navigate to="login" replace/>}/>

            {/* /challenge-1/login */}
            <Route path="login" element={<Challenge1LoginPage />} />

            {/* /challenge-1/todo (protected) */}
            <Route
                path="todo"
                element={
                        <TodoPage />
                }
            />
        </Routes>
    );
}

export default Challenge1App;
