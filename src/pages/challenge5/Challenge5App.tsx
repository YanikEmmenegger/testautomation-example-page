// src/pages/challenge1/Challenge2App.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Challenge5LoginPage from "./Challenge5LoginPage.tsx";
import KanbanPage from "./KanbanPageFull.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function Challenge5App() {
    //change title to Challenge #3
    document.title = "Challenge #5";
    return (
        <DndProvider backend={HTML5Backend}>
        <Routes>
            {/* The default route -> check isLoggedIn -> /login or /kanban */}
            <Route index element={<Navigate to="kanban" replace />} />

            {/* /challenge-1/login */}
            <Route path="login" element={<Challenge5LoginPage />} />

            {/* /challenge-1/kanban (protected) */}
            <Route
                path="kanban"
                element={
                    <ProtectedRoute redirectPath="/challenge-5/login">
                        <KanbanPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
        </DndProvider>
    );
}

export default Challenge5App;
