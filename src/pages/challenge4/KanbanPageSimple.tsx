// src/pages/challenge5/KanbanPageDragDropOnly.tsx

import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Task} from "../../types";
import ColumnDragDropOnly from "../../components/ColumnDargDropOnly.tsx";
import Button from "../../components/ui/Button.tsx";

const initialTasks: Task[] = [
    {
        id: 1,
        title: "Design Wireframes",
        description: "Create wireframes for the new project.",
        status: "Backlog",
        dueDate: "2025-02-15",
        comments: []
    },
    {
        id: 2,
        title: "Develop API Endpoints",
        description: "Set up RESTful API endpoints for user management.",
        status: "In Progress",
        dueDate: "2025-02-20",
        comments: []
    },
    {
        id: 3,
        title: "Implement Authentication",
        description: "Integrate OAuth2 for secure authentication.",
        status: "In Progress",
        dueDate: "2025-02-18",
        comments: []
    },
    {
        id: 4,
        title: "Set Up Database",
        description: "Initialize PostgreSQL database schema.",
        status: "Done",
        dueDate: "2025-02-10",
        comments: []
    },
    {
        id: 5,
        title: "Write Unit Tests",
        description: "Ensure all modules have corresponding unit tests.",
        status: "Backlog",
        dueDate: "2025-02-25",
        comments: []
    }
];

const KanbanPageDragDropOnly: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleMoveTask = (taskId: number, newStatus: Task["status"]) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? {...task, status: newStatus} : task
            )
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                id="kanban-page-drag-drop-only"
                className="min-h-screen bg-gray-100 p-6 flex flex-col"
                aria-label="Kanban Board Drag & Drop Only Page"
            >
                {/* Header */}
                <header
                    id="kanban-header-drag-drop-only"
                    className="flex justify-between items-center mb-6"
                    aria-label="Kanban Header"
                >
                    <h1 className="text-2xl font-bold">Kanban Board - Drag & Drop Only</h1>
                    <a href={"/"}>
                        <Button
                            id="home-button"
                            className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Home
                        </Button>
                    </a>
                </header>

                {/* 3 Column Layout */}
                <div
                    id="kanban-main-drag-drop-only"
                    className="flex flex-1 gap-4"
                    aria-label="Kanban Main Sections"
                >
                    <ColumnDragDropOnly
                        title="Backlog"
                        status="Backlog"
                        tasks={tasks.filter(task => task.status === "Backlog")}
                        onDropTask={handleMoveTask}
                    />
                    <ColumnDragDropOnly
                        title="In Progress"
                        status="In Progress"
                        tasks={tasks.filter(task => task.status === "In Progress")}
                        onDropTask={handleMoveTask}
                    />
                    <ColumnDragDropOnly
                        title="Done"
                        status="Done"
                        tasks={tasks.filter(task => task.status === "Done")}
                        onDropTask={handleMoveTask}
                    />
                </div>
            </div>
        </DndProvider>
    );
};

export default KanbanPageDragDropOnly;
