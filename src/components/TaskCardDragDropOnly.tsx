// src/components/TaskCardDragDropOnly.tsx

import React from "react";
import { useDrag } from "react-dnd";
import { Task } from "../types";

interface TaskCardDragDropOnlyProps {
    task: Task;
}

const TaskCardDragDropOnly: React.FC<TaskCardDragDropOnlyProps> = ({ task }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: "TASK",
        item: { id: task.id },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div
            ref={dragRef}
            id={`task-card-${task.id}`}
            className="task-card p-3 mb-3 bg-gray-100 rounded shadow cursor-move"
            style={{ opacity }}
            aria-label={`Task Card: ${task.title}`}
            data-testid={`task-card-${task.id}`}
        >
            <h3
                className="task-card-title font-bold text-gray-700 mb-1"
                id={`task-card-title-${task.id}`}
                aria-label="Task Title"
                data-testid={`task-card-title-${task.id}`}
            >
                {task.title}
            </h3>
            <p
                className="task-card-description text-sm text-gray-600 mb-2"
                id={`task-card-description-${task.id}`}
                aria-label="Task Description"
                data-testid={`task-card-description-${task.id}`}
            >
                {task.description}
            </p>
            <p
                className="task-card-due text-xs text-gray-500"
                id={`task-card-due-${task.id}`}
                aria-label="Task Due Date"
                data-testid={`task-card-due-${task.id}`}
            >
                Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
        </div>
    );
};

export default TaskCardDragDropOnly;
