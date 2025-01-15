// src/components/ColumnDragDropOnly.tsx

import React from "react";
import { useDrop } from "react-dnd";
import TaskCardDragDropOnly from "./TaskCardDragDropOnly";
import { Task } from "../types";

interface ColumnDragDropOnlyProps {
    title: string;
    status: Task["status"];
    tasks: Task[];
    onDropTask: (taskId: number, newStatus: Task["status"]) => void;
}

const ColumnDragDropOnly: React.FC<ColumnDragDropOnlyProps> = ({
                                                                   title,
                                                                   status,
                                                                   tasks,
                                                                   onDropTask
                                                               }) => {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: "TASK",
        drop: (item: { id: number }) => {
            onDropTask(item.id, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const isActive = isOver && canDrop;

    return (
        <section
            ref={dropRef}
            id={`kanban-column-${status.toLowerCase().replace(" ", "-")}`}
            className={`kanban-column w-1/3 bg-white p-4 rounded shadow-md ${
                isActive ? "bg-blue-50" : ""
            }`}
            aria-label={`${title} Column`}
            data-testid={`kanban-column-${status.toLowerCase().replace(" ", "-")}`}
        >
            <h2
                className="kanban-column-title text-xl font-semibold mb-4 text-gray-800"
                id={`kanban-column-title-${status.toLowerCase().replace(" ", "-")}`}
                aria-label="Column Title"
                data-testid={`kanban-column-title-${status.toLowerCase().replace(" ", "-")}`}
            >
                {title}
            </h2>
            {tasks.map(task => (
                <TaskCardDragDropOnly key={task.id} task={task} />
            ))}
        </section>
    );
};

export default ColumnDragDropOnly;
