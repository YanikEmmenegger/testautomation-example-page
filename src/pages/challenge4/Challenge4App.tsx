// src/pages/challenge1/Challenge2App.tsx
import {Navigate, Route, Routes} from "react-router-dom";
import KanbanPage from "./KanbanPageSimple.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function Challenge4App() {
    //change title to Challenge #3
    document.title = "Challenge #4";
    return (
        <DndProvider backend={HTML5Backend}>
            <Routes>
                {/* The default route -> check isLoggedIn -> /login or /kanban */}
                <Route index element={<Navigate to="kanban" replace/>}/>

                {/* /challenge-1/login */}


                {/* /challenge-1/kanban (protected) */}
                <Route
                    path="kanban"
                    element={

                        <KanbanPage/>
                    }
                />
            </Routes>
        </DndProvider>
    );
}

export default Challenge4App;
