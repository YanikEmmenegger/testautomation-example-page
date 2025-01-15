// src/components/TaskCard.tsx

import React, {useEffect, useRef, useState} from "react";
import {useDrag} from "react-dnd";
import {Task} from "../types";
import Button from "./ui/Button";
import {simulateDelay} from "../utils/simulateDelay";
import {toast} from "react-hot-toast";

interface TaskCardProps {
    task: Task;
    isCookieAccepted: boolean;
    onDelete: (task: Task) => void;
    onArchive: (task: Task) => void;
    onEdit: (task: Task) => void;
    onAddComment: (taskId: number, comment: string) => void;
    className?: string;
    id?: string;
}

function daysUntilDue(dueDate: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dueDate);
    selected.setHours(0, 0, 0, 0);
    return Math.ceil((selected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

const TaskCard: React.FC<TaskCardProps> = ({
                                               task,
                                               isCookieAccepted,
                                               onEdit,
                                               onDelete,
                                               onArchive,
                                               onAddComment,
                                               className = "",
                                               id,
                                               ...props
                                           }) => {
    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "CARD",
        item: {id: task.id},
        canDrag: isCookieAccepted,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [isCookieAccepted, task.id]);

    console.log(id)

    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0});
    const [confirmAction, setConfirmAction] = useState<"delete" | "archive" | null>(null);
    const [showAddCommentModal, setShowAddCommentModal] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [savingComment, setSavingComment] = useState(false);
    const [deletingOrArchiving, setDeletingOrArchiving] = useState(false);

    const contextMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
                setShowContextMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!isCookieAccepted) return;
        setContextMenuPosition({x: event.clientX, y: event.clientY});
        setShowContextMenu(true);
    };

    const handleConfirmAction = async () => {
        if (confirmAction === "delete") {
            setDeletingOrArchiving(true);
            await simulateDelay(0.5, 2);
            onDelete(task);
            toast.success("Task deleted!");
            setDeletingOrArchiving(false);
        } else if (confirmAction === "archive") {
            setDeletingOrArchiving(true);
            await simulateDelay(0.5, 2);
            onArchive(task);
            toast.success("Task archived!");
            setDeletingOrArchiving(false);
        }
        setConfirmAction(null);
    };

    const handleSaveComment = async () => {
        if (!newComment.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }

        setSavingComment(true);
        try {
            await simulateDelay(0.5, 2);
            onAddComment(task.id, newComment.trim());
            toast.success("Comment added successfully!");
            setShowAddCommentModal(false);
        } catch (error) {
            toast.error("Failed to add comment.");
            console.error(error);
        } finally {
            setSavingComment(false);
            setNewComment("");
        }
    };

    const daysLeft = daysUntilDue(task.dueDate);
    let backgroundColor = "bg-gray-50";
    let dueLabel =      "";

    if (daysLeft < 0) {
        backgroundColor = "bg-red-200";
        dueLabel = "Expired";
    } else if (daysLeft === 0) {
        backgroundColor = "bg-red-200";
        dueLabel = "Due today";
    } else if (daysLeft <= 3) {
        backgroundColor = "bg-orange-200";
        dueLabel = `Due in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`;
    } else if (daysLeft <= 7) {
        backgroundColor = "bg-yellow-200";
        dueLabel = `Due in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`;
    } else {
        dueLabel = `Due in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`;
    }

    return (
        <div
            ref={dragRef}
            onContextMenu={handleContextMenu}
            className={`task-card task-${task.status.replace(" ", "-").toLocaleLowerCase()} ${backgroundColor} p-3 rounded shadow-sm mb-2 cursor-pointer ${isDragging ? "opacity-50" : ""} ${!isCookieAccepted ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
            id={`task-card-${task.id}`}
            {...props}
        >
            <h3
                className="task-card-title font-bold"
                id={`task-card-title-${task.id}`}
            >
                {task.title}
            </h3>
            <p
                className="task-card-description text-sm text-gray-600"
                id={`task-card-description-${task.id}`}
            >
                {task.description}
            </p>
            <p
                className="task-card-due text-xs text-gray-500"
                id={`task-card-due-${task.id}`}
            >
                {dueLabel}
            </p>

            {task.comments.length > 0 && (
                <div
                    className="task-card-comments mt-2"
                    id={`task-card-comments-${task.id}`}
                >
                    <p className="task-card-comments-label text-xs font-semibold">Comments:</p>
                    <ul className="task-card-comments-list list-disc list-inside text-xs text-gray-600">
                        {task.comments.map((comment, index) => (
                            <li key={index} id={`task-comment-${task.id}-${index}`}>
                                {comment}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showContextMenu && (
                <div
                    ref={contextMenuRef}
                    style={{top: contextMenuPosition.y, left: contextMenuPosition.x}}
                    className="task-card-context-menu absolute flex flex-col gap-2 bg-white shadow-lg rounded-md p-2 z-50"
                    id={`task-card-context-menu-${task.id}`}
                >
                    <Button
                        onClick={() => {
                            onEdit(task);
                            setShowContextMenu(false);
                        }}
                        className="context-menu-edit-button"
                        aria-label={`Edit Task ${task.title}`}
                        id={`context-menu-edit-button`}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => {
                            setConfirmAction("delete");
                            setShowContextMenu(false);
                        }}
                        className="context-menu-delete-button"
                        aria-label={`Delete Task ${task.title}`}
                        id={`context-menu-delete-button`}
                    >
                        Delete
                    </Button>
                    {task.status === "Done" && (
                        <Button
                            onClick={() => {
                                setConfirmAction("archive");
                                setShowContextMenu(false);
                            }}
                            className="context-menu-archive-button"
                            aria-label={`Archive Task ${task.title}`}
                            id={`context-menu-archive-button`}
                        >
                            Archive
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            setShowAddCommentModal(true);
                            setShowContextMenu(false);
                        }}
                        className="context-menu-add-comment-button"
                        aria-label={`Add Comment to Task ${task.title}`}
                        id={`context-menu-add-comment-button`}
                    >
                        Add Comment
                    </Button>
                </div>
            )}

            {confirmAction && (
                <div
                    className="task-card-confirmation-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    id={`confirmation-overlay`}
                >
                    <div className="task-card-confirmation-modal bg-white p-6 rounded shadow-lg"
                         id={`confirmation-modal`}>
                        <h3
                            className="task-card-confirmation-title text-lg font-bold mb-4"
                            id={`confirmation-title`}
                        >
                            {confirmAction === "delete" ? "Delete Task?" : "Archive Task?"}
                        </h3>
                        <p
                            className="task-card-confirmation-description mb-4"
                            id={`confirmation-description`}
                        >
                            {confirmAction === "delete" ? "Are you sure you want to delete this task?" : "Are you sure you want to archive this task?"}
                        </p>
                        <div className="task-card-confirmation-buttons flex justify-end gap-2">
                            <Button
                                disabled={deletingOrArchiving}
                                onClick={() => setConfirmAction(null)}
                                className="confirmation-cancel-button bg-gray-400 text-white"
                                aria-label="Cancel Confirmation"
                                id={`confirmation-cancel-button`}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={deletingOrArchiving}
                                onClick={handleConfirmAction}
                                className={`confirmation-action-button ${
                                    confirmAction === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-yellow-500 hover:bg-yellow-600"
                                } text-white`}
                                aria-label={confirmAction === "delete" ? "Confirm Delete" : "Confirm Archive"}
                                id={`confirmation-action-button`}
                            >
                                {confirmAction === "delete"
                                    ? deletingOrArchiving
                                        ? "Deleting..."
                                        : "Delete"
                                    : deletingOrArchiving
                                        ? "Archiving..."
                                        : "Archive"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {showAddCommentModal && (
                <div
                    className="task-card-add-comment-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    id={`add-comment-overlay`}
                >
                    <div className="task-card-add-comment-modal bg-white p-6 rounded shadow-lg"
                         id={`add-comment-modal`}>
                        <h3
                            className="task-card-add-comment-title text-lg font-bold mb-4"
                            id={`add-comment-title`}
                        >
                            Add Comment
                        </h3>
                        <textarea
                            className="task-card-add-comment-textarea w-full border rounded p-2 mb-4"
                            placeholder="Enter your comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={savingComment}
                            id={`add-comment-textarea`}
                        />
                        <div className="task-card-add-comment-buttons flex justify-end gap-2">
                            <Button
                                disabled={savingComment}
                                onClick={() => setShowAddCommentModal(false)}
                                className="add-comment-cancel-button bg-gray-400 text-white"
                                aria-label="Cancel Add Comment"
                                id={`add-comment-cancel-button`}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={savingComment}
                                onClick={handleSaveComment}
                                className="add-comment-save-button bg-green-600 hover:bg-green-700 text-white"
                                aria-label="Save Comment"
                                id={`add-comment-save-button`}
                            >
                                {savingComment ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
