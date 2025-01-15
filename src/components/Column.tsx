// src/components/Column.tsx

import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { Task } from "../types";
import { AiOutlineLoading } from "react-icons/ai";

interface ColumnProps {
    title: string;  // "Backlog" | "In Progress" | "Done"
    status: Task["status"];
    tasks: Task[];
    onDropTask: (taskId: number, newStatus: Task["status"]) => void;
    onEditTask: (task: Task) => void;

    /**
     * Called when user confirms deleting a task
     */
    onDeleteTask: (task: Task) => void;

    /**
     * Called when user confirms archiving a task (status === "Done")
     */
    onArchiveTask: (task: Task) => void;

    /**
     * Called when user adds a comment to a task
     */
    onAddComment: (taskId: number, comment: string) => void;

    isCookieAccepted: boolean;

    /** Whether tasks are loading (then we show a spinner) */
    loading: boolean;

    /** Additional className for the column */
    className?: string;
}

const Column: React.FC<ColumnProps> = ({
                                           title,
                                           status,
                                           tasks,
                                           onDropTask,
                                           onEditTask,
                                           onDeleteTask,
                                           onArchiveTask,
                                           isCookieAccepted,
                                           onAddComment,
                                           loading,
                                           className = "",
                                       }) => {
    // We accept type "CARD"
    const [{ isOver }, dropRef] = useDrop({
        accept: "CARD",
        drop: (item: { id: number }) => {
            onDropTask(item.id, status);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <section
            id={`kanban-column-${status.toLowerCase().replace(" ", "-")}`}
            className={`kanban-column ${className} w-1/3 bg-white p-4 rounded shadow-md`}
            aria-label={`${title} Section`}
            ref={dropRef}
            style={{ backgroundColor: isOver ? "#f0f8ff" : undefined }} // light highlight
        >
            <h2
                className="kanban-column-title text-xl font-semibold mb-2"
                id={`kanban-column-title-${status.toLowerCase().replace(" ", "-")}`}
            >
                {title}
            </h2>
            {loading ? (
                <div
                    className="kanban-column-loading flex flex-col h-full items-center justify-center mx-auto"
                    id={`kanban-column-loading-${status.toLowerCase().replace(" ", "-")}`}
                >
                    <p className="animate-spin loading-spinner">
                        <AiOutlineLoading />
                    </p>
                    <p className="loading-text">Loading Tasks</p>
                </div>
            ) : (
                tasks.map((task) => (
                    <TaskCard
                        onAddComment={onAddComment}
                        key={task.id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onArchive={onArchiveTask}
                        isCookieAccepted={isCookieAccepted}
                        className="kanban-task-card"
                        id={`task-card-${task.id}`}
                    />
                ))
            )}
        </section>
    );
};

export default Column;
