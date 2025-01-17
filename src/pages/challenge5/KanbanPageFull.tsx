// src/pages/challenge5/KanbanBoard.tsx

import React, { useState, useEffect, useRef } from "react";
import CookieBanner from "../../components/CookieBanner";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { simulateDelay } from "../../utils/simulateDelay";
import Column from "../../components/Column";
import { Task } from "../../types";
import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

/** For date validation */
function isDateInPast(dateString: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dateString);
    selected.setHours(0, 0, 0, 0);
    return selected < today;
}

/** Days difference utility */
function daysUntilDue(dueDate: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dueDate);
    selected.setHours(0, 0, 0, 0);

    // difference in ms
    const diffMs = selected.getTime() - today.getTime();
    // convert to days
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

const LOCAL_STORAGE_KEY = "challenge5-kanban";

const KanbanBoard: React.FC = () => {
    const {logout, isCookieAccepted} = useAuth();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // Form fields
    const [taskId, setTaskId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Task["status"]>("Backlog");
    const [dueDate, setDueDate] = useState(""); // Standardized format (YYYY-MM-DD)
    const [dueDateInput, setDueDateInput] = useState(""); // Raw input from text field

    // Loading state for saving (Create/Update)
    const [saving, setSaving] = useState(false);

    // For the right-side archive sidebar
    const [showArchive, setShowArchive] = useState(false);

    // State for "Reopen" confirmation
    const [reopenConfirmTask, setReopenConfirmTask] = useState<Task | null>(null);

    // Reference for detecting clicks outside the date picker
    const datePickerRef = useRef<HTMLDivElement>(null);

    // -----------------------------
    // 1. Load tasks from localStorage
    // -----------------------------
    useEffect(() => {
        async function loadTasks() {
            await simulateDelay(0.5, 3);
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                setTasks(JSON.parse(stored));
            }
            setLoadingTasks(false);
        }

        loadTasks();
    }, []);

    // Sync tasks to local storage
    useEffect(() => {
        if (!loadingTasks) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks, loadingTasks]);

    // -----------------------------
    // 2. Helpers for the modal
    // -----------------------------
    const resetForm = () => {
        setTaskId(null);
        setTitle("");
        setDescription("");
        setStatus("Backlog");
        setDueDate("");
        setDueDateInput("");
        setSaving(false);
    };

    const handleOpenAddModal = () => {
        setEditMode(false);
        resetForm();
        setShowModal(true);
    };

    const handleOpenEditModal = (task: Task) => {
        setEditMode(true);
        setTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(task.dueDate);
        setDueDateInput(format(new Date(task.dueDate), "dd.MM.yyyy"));
        setSaving(false);
        setShowModal(true);
    };
    const handleAddComment = (taskId: number, comment: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? { ...task, comments: [...task.comments, comment] }
                    : task
            )
        );
        //toast.success("Comment added!");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    // -----------------------------
    // 3. Create or Edit Task
    // -----------------------------
    const handleSaveTask = async () => {
        // validations
        if (!title.trim()) {
            toast.error("Title cannot be empty!");
            return;
        }
        if (!dueDate) {
            toast.error("Please select a due date!");
            return;
        }
        if (isDateInPast(dueDate)) {
            toast.error("Due date cannot be in the past!");
            return;
        }

        setSaving(true);

        try {
            await simulateDelay(0.5, 2);

            if (!editMode) {
                // CREATE
                const newTask: Task = {
                    id: Date.now(),
                    title,
                    description,
                    status,
                    dueDate,
                    comments: [],
                };
                setTasks((prev) => [...prev, newTask]);
                toast.success("Task created successfully!");
            } else {
                // EDIT
                setTasks((prev) =>
                    prev.map((t) =>
                        t.id === taskId
                            ? {...t, title, description, status, dueDate}
                            : t
                    )
                );
                toast.success("Task updated successfully!");
            }

            handleCloseModal();
        } catch (err) {
            console.log(err);
            toast.error("Failed to save task.");
        } finally {
            setSaving(false);
        }
    };

    // -----------------------------
    // 4. Drag & Drop - Immediate Visual Update
    // -----------------------------
    const handleDropTask = async (taskId: number, newStatus: Task["status"]) => {
        const draggedTask = tasks.find((t) => t.id === taskId);
        if (!draggedTask) return;

        // 1) OPTIMISTIC UPDATE
        const oldTasks = [...tasks];
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId ? {...t, status: newStatus} : t
            )
        );

        // 2) Simulate server call
        try {
            await simulateDelay(0.1, 0.4);
            //toast.success(`Task moved to "${newStatus}"`);
        } catch (err) {
            console.log(err);
            // Revert if error
            setTasks(oldTasks);
            toast.error("Failed to move task. Reverted changes.");
        }
    };

    // -----------------------------
    // 5. Delete + Archive
    // -----------------------------
    const handleDeleteTask = (task: Task) => {
        // remove from tasks
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
        //toast.success("Task deleted!");
    };

    const handleArchiveTask = (task: Task) => {
        // mark archived
        setTasks((prev) =>
            prev.map((t) =>
                t.id === task.id ? {...t, status: "Archived"} : t
            )
        );
        //toast.success("Task archived!");
    };

    // -----------------------------
    // 6. Archive Sidebar
    // -----------------------------
    const archivedTasks = tasks
        .filter((t) => t.status === "Archived")
        .sort((a, b) => {
            // order by date ascending
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });

    const handleOpenArchive = () => {
        setShowArchive(true);
    };

    const handleCloseArchive = () => {
        setShowArchive(false);
    };

    // Handle "Reopen" button
    const handleReopenClick = (task: Task) => {
        setReopenConfirmTask(task);
    };

    const handleCloseReopenConfirm = () => {
        setReopenConfirmTask(null);
    };

    const handleConfirmReopen = () => {
        if (!reopenConfirmTask) return;
        const {id} = reopenConfirmTask;
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? {...t, status: "Backlog"} : t
            )
        );
        toast.success("Task reopened to 'Backlog'!");
        setReopenConfirmTask(null);
    };

    // -----------------------------
    // 7. Separate tasks by status
    // -----------------------------
    const backlogTasks = tasks.filter((t) => t.status === "Backlog");
    const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
    const doneTasks = tasks.filter((t) => t.status === "Done");

    // -----------------------------
    // 8. Legend for Colors
    // -----------------------------
    // We'll show it somewhere in the header or top of the board
    // "Yellow = 7 days left, Orange = 3 days left, Red = due today"
    // plus "Expired" if < 0

    // -----------------------------
    // 9. Date Parsing Utility
    // -----------------------------
    /**
     * Attempts to parse various date formats and returns a standardized date string (YYYY-MM-DD).
     * Supported formats:
     * - DDMMYYYY (e.g., 26081999)
     * - DD.MM.YYYY (e.g., 26.08.1999)
     * - DD/MM/YYYY (e.g., 26/08/1999)
     * - DD-MM-YYYY (e.g., 26-08-1999)
     */
    const parseDateInput = (input: string): string | null => {
        // Remove all non-digit and non-dot/slash/hyphen characters
        const sanitized = input.trim().replace(/[^0-9./-]/g, "");

        let parsedDate: Date | null = null;

        // Try multiple formats
        const formatsToTry = ["dd.MM.yyyy", "dd/MM/yyyy", "dd-MM-yyyy", "ddMMyyyy"];

        for (const fmt of formatsToTry) {
            try {
                const date = parse(sanitized, fmt, new Date());
                if (!isNaN(date.getTime())) {
                    parsedDate = date;
                    break;
                }
            } catch (e) {
                console.log(e);
                            }
        }

        if (parsedDate) {
            return format(parsedDate, "yyyy-MM-dd"); // Standard format for state
        }

        return null; // Invalid date
    };

    // -----------------------------
    // 10. Click Outside Handler for Date Picker
    // -----------------------------
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                datePickerRef.current &&
                !datePickerRef.current.contains(event.target as Node)
            ) {
                setShowDatePicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // State to control date picker visibility
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <div
            id="kanban-page-container"
            className="min-h-screen bg-gray-100 p-6 flex flex-col"
            aria-label="Kanban Board Container"
        >
            <CookieBanner/>

            {/* Header */}
            <header
                id="kanban-header"
                className="flex justify-between items-center mb-6"
                aria-label="Kanban Header"
            >
                <div className="flex items-center gap-4">
                    <Button
                        id="logout-button"
                        onClick={logout}
                        disabled={!isCookieAccepted}
                        className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Logout Button"
                    >
                        Logout
                    </Button>
                    <Button
                        id="new-task-button"
                        onClick={handleOpenAddModal}
                        disabled={!isCookieAccepted}
                        className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="New Task Button"
                    >
                        New Task
                    </Button>

                    {/* ARCHIVE BUTTON */}
                    <Button
                        id="archive-button"
                        onClick={handleOpenArchive}
                        disabled={!isCookieAccepted}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Open Archive Sidebar"
                    >
                        Archive
                    </Button>
                </div>

                {/* Legend */}
                <div
                    id="legend"
                    className="flex flex-col text-sm text-gray-600 space-y-1"
                    aria-label="Due Date Legend"
                >
                    <p><span className="font-bold">Legend:</span></p>
                    <p>Yellow = Task due in ≤ 7 days</p>
                    <p>Orange = Task due in ≤ 3 days</p>
                    <p>Red = Task is due today</p>
                    <p>Expired = Task is past due</p>
                </div>
            </header>

            {/* 3 Column Layout */}
            <div
                id="kanban-main"
                className="flex flex-1 gap-4"
                aria-label="Kanban Main Sections"
            >
                <Column
                    onAddComment={handleAddComment}
                    title="Backlog"
                    status="Backlog"
                    loading={loadingTasks}
                    tasks={backlogTasks}
                    onDropTask={handleDropTask}
                    onEditTask={handleOpenEditModal}
                    onDeleteTask={handleDeleteTask}
                    onArchiveTask={handleArchiveTask}
                    isCookieAccepted={isCookieAccepted}
                />
                <Column
                    onAddComment={handleAddComment}

                    title="In Progress"
                    status="In Progress"
                    loading={loadingTasks}
                    tasks={inProgressTasks}
                    onDropTask={handleDropTask}
                    onEditTask={handleOpenEditModal}
                    onDeleteTask={handleDeleteTask}
                    onArchiveTask={handleArchiveTask}
                    isCookieAccepted={isCookieAccepted}
                />
                <Column
                    onAddComment={handleAddComment}
                    title="Done"
                    status="Done"
                    loading={loadingTasks}
                    tasks={doneTasks}
                    onDropTask={handleDropTask}
                    onEditTask={handleOpenEditModal}
                    onDeleteTask={handleDeleteTask}
                    onArchiveTask={handleArchiveTask}
                    isCookieAccepted={isCookieAccepted}
                />
            </div>

            {/* SIDEBAR FOR ARCHIVED TASKS */}
            {showArchive && (
                <div
                    id="archive-sidebar"
                    className="fixed top-0 left-0 w-80 h-full bg-white shadow-xl p-4 flex flex-col"
                    aria-label="Archive Sidebar"
                    style={{zIndex: 50}}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Archived Tasks</h3>
                        <Button
                            id="archive-close-button"
                            onClick={handleCloseArchive}
                            className="bg-gray-300 hover:bg-gray-400 text-black"
                            aria-label="Close Archive Sidebar"
                        >
                            Close
                        </Button>
                    </div>

                    {/* LIST ALL ARCHIVED TASKS */}
                    <ul className="flex-1 overflow-auto space-y-2">
                        {archivedTasks.length === 0 ? (
                            <p className="text-gray-500">No archived tasks.</p>
                        ) : (
                            archivedTasks.map((task) => (
                                <li
                                    key={task.id}
                                    className="bg-gray-100 p-3 rounded shadow-sm"
                                >
                                    <h4 className="font-bold">{task.title}</h4>
                                    <p className="text-sm text-gray-600">{task.description}</p>

                                    {daysUntilDue(task.dueDate) < 0 ? (
                                        <p className="text-xs text-gray-500">Due
                                            was: {format(new Date(task.dueDate), "dd.MM.yyyy")}</p>
                                    ) : (
                                        <p className="text-xs text-gray-500">Due
                                            in: {daysUntilDue(task.dueDate)} day{daysUntilDue(task.dueDate) !== 1 ? "s" : ""}</p>
                                    )}
                                    <Button
                                        className="bg-green-600 hover:bg-green-700 text-white mt-2"
                                        onClick={() => handleReopenClick(task)}
                                        aria-label={`Reopen Task ${task.title}`}
                                    >
                                        Reopen
                                    </Button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}

            {/* REOPEN CONFIRMATION MODAL */}
            {reopenConfirmTask && (
                <div
                    id="reopen-confirm-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    aria-label="Reopen Confirmation Overlay"
                >
                    <div
                        id="reopen-confirm-modal"
                        className="bg-white w-full max-w-sm p-4 rounded shadow-lg"
                        aria-label="Reopen Confirm Modal"
                    >
                        <h3 className="text-lg font-bold mb-2">Reopen Task?</h3>
                        <p className="mb-4">
                            Are you sure you want to move this archived task back to Backlog?
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={handleCloseReopenConfirm}
                                className="bg-gray-400 hover:bg-gray-500 text-white"
                                aria-label="Cancel Reopen"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmReopen}
                                className="bg-green-600 hover:bg-green-700 text-white"
                                aria-label="Confirm Reopen"
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Create/Edit Task */}
            {showModal && (
                <div
                    id="task-modal-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    aria-label="Task Modal Overlay"
                >
                    <div
                        id="task-modal"
                        className="bg-white w-full max-w-md p-6 rounded shadow-lg"
                        aria-label="Task Modal"
                        ref={datePickerRef}
                    >
                        <h2
                            id="task-modal-title"
                            className="text-xl font-bold mb-4"
                            aria-label="Task Modal Title"
                        >
                            {editMode ? "Edit Task" : "Create a New Task"}
                        </h2>

                        {/* Title */}
                        <div className="mb-4">
                            <label htmlFor="task-modal-title" className="block font-medium mb-1">
                                Title
                            </label>
                            <Input
                                id="task-modal-title"
                                type="text"
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full"
                                aria-label="Task Title Input"
                                disabled={!isCookieAccepted || saving}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label
                                htmlFor="task-modal-description"
                                className="block font-medium mb-1"
                            >
                                Description
                            </label>
                            <Input
                                id="task-modal-description"
                                type="text"
                                placeholder="Task Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full"
                                aria-label="Task Description Input"
                                disabled={!isCookieAccepted || saving}
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label htmlFor="task-modal-status" className="block font-medium mb-1">
                                Status
                            </label>
                            <select
                                id="task-modal-status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as Task["status"])}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                aria-label="Task Status Select"
                                disabled={!isCookieAccepted || saving}
                            >
                                <option value="Backlog">Backlog</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        {/* Due Date */}
                        <div className="mb-4 relative">
                            <label htmlFor="task-modal-due" className="block font-medium mb-1">
                                Due Date
                            </label>
                            <div className="flex items-center">
                                {/* Text Input for Date */}
                                <Input
                                    id="task-modal-due-text"
                                    type="text"
                                    placeholder="DD.MM.YYYY"
                                    value={dueDateInput}
                                    onChange={(e) => setDueDateInput(e.target.value)}
                                    onBlur={() => {
                                        const parsed = parseDateInput(dueDateInput);
                                        if (parsed) {
                                            setDueDate(parsed);
                                            setDueDateInput(format(new Date(parsed), "dd.MM.yyyy"));
                                        } else {
                                            if (dueDateInput.trim()) {
                                                toast.error("Invalid date format. Please use DD.MM.YYYY, DDMMYYYY, DD/MM/YYYY, or DD-MM-YYYY.");
                                                setDueDate("");
                                            }
                                        }
                                    }}
                                    className="w-full pr-10"
                                    aria-label="Task Due Date Text Input"
                                    disabled={!isCookieAccepted || saving}
                                />

                                {/* Calendar Icon */}
                                <button
                                    type="button"
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                    className="absolute right-0 mr-2 focus:outline-none"
                                    aria-label="Open Date Picker"
                                >
                                    <FaCalendarAlt className="text-gray-500 hover:text-gray-700"/>
                                </button>

                                {/* Date Picker */}
                                {showDatePicker && (
                                    <div className="absolute left-1/2 z-10">
                                        <DatePicker
                                            selected={dueDate ? new Date(dueDate) : null}
                                            onChange={(date: Date | null) => {
                                                if (date) {
                                                    const formattedDate = format(date, "yyyy-MM-dd");
                                                    setDueDate(formattedDate);
                                                    setDueDateInput(format(date, "dd.MM.yyyy"));
                                                    setShowDatePicker(false);
                                                }
                                            }}
                                            dateFormat="dd.MM.yyyy"
                                            inline
                                            onClickOutside={() => setShowDatePicker(false)}
                                        />
                                    </div>
                                )}
                            </div>
                            <small className="text-gray-500">
                                Acceptable formats: DDMMYYYY, DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY
                            </small>
                        </div>

                        {/* Modal Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button
                                id="task-modal-cancel-button"
                                onClick={handleCloseModal}
                                className="bg-gray-400 hover:bg-gray-500 text-white"
                                aria-label="Cancel Task Modal"
                                disabled={saving}
                            >
                                Cancel
                            </Button>
                            <Button
                                id="task-modal-save-button"
                                onClick={handleSaveTask}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                aria-label="Save Task"
                                disabled={!isCookieAccepted || saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editMode
                                        ? "Save Changes"
                                        : "Create"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
    export default KanbanBoard;
