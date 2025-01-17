import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import CookieBanner from "../../components/CookieBanner";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {simulateDelay} from "../../utils/simulateDelay";
import {toast} from "react-hot-toast";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: number;
}

const LOCAL_STORAGE_KEY = "challenge3-todos";

type TodoOperation = "none" | "updating" | "completing" | "deleting";

const TodoPage3: React.FC = () => {
    const { logout, isCookieAccepted } = useAuth();

    // For loading stored todos on initial mount
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loadingTodos, setLoadingTodos] = useState(true);

    // For adding a new todo
    const [newTodoText, setNewTodoText] = useState("");
    const [addInProgress, setAddInProgress] = useState(false);

    // For editing an existing todo
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");

    // Per-todo operation states (e.g. "deleting", "updating")
    const [todoOps, setTodoOps] = useState<Record<number, TodoOperation>>({});

    // Ascending vs descending sort
    const [sortAsc, setSortAsc] = useState(true);

    // ----- Load Todos from Local Storage (Simulated Delay) -----
    useEffect(() => {
        async function loadTodos() {
            await simulateDelay(0.5, 4); // random 0.5–2s
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                setTodos(JSON.parse(stored));
            }
            setLoadingTodos(false);
        }
        loadTodos();
    }, []);

    // ----- Sync Todos to localStorage whenever they change -----
    useEffect(() => {
        if (!loadingTodos) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        }
    }, [todos, loadingTodos]);

    // --- Statistics ---
    const totalCount = todos.length;
    const completedCount = todos.filter((t) => t.completed).length;
    const incompleteCount = totalCount - completedCount;

    // --- Helpers to set/get operation state for each todo ---
    const setTodoOperation = (todoId: number, op: TodoOperation) => {
        setTodoOps((prev) => ({ ...prev, [todoId]: op }));
    };
    const getTodoOperation = (todoId: number): TodoOperation =>
        todoOps[todoId] || "none";

    // =========================
    // 1) ADD NEW TODO
    // =========================
    const handleAddTodo = async () => {
        if (!newTodoText.trim()) {
            toast.error("You cannot add an empty todo!");
            return;
        }

        setAddInProgress(true); // triggers "Adding..."
        try {
            await simulateDelay(8, 10);
            const newTodo: Todo = {
                id: Date.now(),
                text: newTodoText,
                completed: false,
                createdAt: Date.now(),
            };
            setTodos((prev) => [...prev, newTodo]);
            setNewTodoText("");
            toast.success("Todo added successfully!");
        } finally {
            setAddInProgress(false);
        }
    };

    // =========================
    // 2) TOGGLE COMPLETE
    // =========================
    const handleToggleComplete = async (id: number) => {
        setTodoOperation(id, "completing");
        try {
            await simulateDelay(3, 10);
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            );
        } finally {
            setTodoOperation(id, "none");
        }
    };

    // =========================
    // 3) DELETE A TODO
    // =========================
    const handleDelete = async (id: number) => {
        setTodoOperation(id, "deleting");
        try {
            await simulateDelay(4, 10);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
            toast.success("Todo deleted successfully!");
        } finally {
            setTodoOperation(id, "none");
        }
    };

    // =========================
    // 4) EDIT A TODO (ENTER EDIT MODE)
    // =========================
    const handleEdit = (todo: Todo) => {
        setEditingTodoId(todo.id);
        setEditingText(todo.text);
    };

    // CANCEL EDIT
    const handleCancelEdit = () => {
        setEditingTodoId(null);
        setEditingText("");
    };

    // SAVE EDIT
    const handleSaveEdit = async () => {
        if (editingTodoId === null) return;

        if (!editingText.trim()) {
            toast.error("You cannot save an empty todo!");
            return;
        }

        setTodoOperation(editingTodoId, "updating");
        try {
            await simulateDelay(3, 10);
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === editingTodoId ? { ...todo, text: editingText } : todo
                )
            );
            toast.success("Todo updated successfully!");
            setEditingTodoId(null);
            setEditingText("");
        } finally {
            setTodoOperation(editingTodoId, "none");
        }
    };

    // =========================
    // 5) SORT
    // =========================
    const toggleSortOrder = () => {
        setSortAsc((prev) => !prev);
    };



    // Sort them
    const sortedTodos = [...todos].sort((a, b) => {
        if (sortAsc) return a.createdAt - b.createdAt;
        return b.createdAt - a.createdAt;
    });

    return (
        <div
            id="todo-page-container"
            className="min-h-screen bg-gray-100 p-6 flex flex-col relative"
            aria-label="Todo Page Container"
        >
            <CookieBanner maxDelay={15} minDelay={8}/>

            {/* Top bar: Logout */}
            <div
                id="todo-page-header"
                className="flex justify-start mb-4"
                aria-label="Todo Page Header"
            >
                <Button
                    id="todo-logout-button"
                    onClick={logout}
                    disabled={!isCookieAccepted}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Logout Button"
                >
                    Logout
                </Button>
            </div>

            <div
                id="todo-page-main"
                className="max-w-xl w-full mx-auto bg-white p-6 shadow-lg rounded"
                aria-label="Todo Main Section"
            >
                <h1
                    id="todo-title"
                    className="text-2xl font-bold mb-4 text-center"
                    aria-label="Todo Page Title"
                >
                    My Todo List (Challenge #3)
                </h1>

                {/* Stats */}
                <div
                    id="todo-stats-container"
                    className="mb-4 flex justify-around text-sm text-gray-600"
                    aria-label="Todo Stats"
                >
                    <p id="todo-status-total" aria-label="Total Todos">
                        <span className="font-semibold">Total:</span> {totalCount}
                    </p>
                    <p id="todo-status-completed"
                       aria-label="Completed Todos">
                        <span className="font-semibold">Completed:</span> {completedCount}
                    </p>
                    <p id="todo-status-incomplete"
                       aria-label="Incomplete Todos">
                        <span className="font-semibold">Incomplete:</span> {incompleteCount}
                    </p>
                </div>

                {/* ADD NEW TODO */}
                <div
                    id="todo-add-container"
                    className="mb-4 flex gap-2"
                    aria-label="Add New Todo Container"
                >
                    <Input
                        id="todo-new-input"
                        type="text"
                        placeholder="Enter new todo"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        disabled={!isCookieAccepted || addInProgress}
                        className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="New Todo Input"
                    />
                    <Button
                        id="todo-add-button"
                        onClick={handleAddTodo}
                        disabled={!isCookieAccepted || addInProgress}
                        className="bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Add Todo Button"
                    >
                        {addInProgress ? "Adding..." : "Add"}
                    </Button>
                </div>

                {/* SORT BUTTON */}
                <div
                    id="todo-sort-container"
                    className="mb-4 text-right"
                    aria-label="Todo Sort Container"
                >
                    <Button
                        id="todo-sort-button"
                        onClick={toggleSortOrder}
                        disabled={!isCookieAccepted}
                        className="bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Sort Todo Button"
                    >
                        Sort {sortAsc ? "Descending" : "Ascending"}
                    </Button>
                </div>

                {/* TODO LIST */}
                {loadingTodos ? (<p>Loading todos...</p>) : (
                <ul
                    id="todo-list"
                    className="space-y-2"
                    aria-label="Todo List"
                >
                    {sortedTodos.map((todo, index) => {
                        const isEditing = editingTodoId === todo.id;
                        const op = getTodoOperation(todo.id);

                        // If we are editing THIS todo, we also disable its Delete & Complete
                        const disableDeleteAndComplete = isEditing;

                        return (
                            <li
                                key={todo.id}
                                aria-index={index}
                                id={`todo-item-${todo.id}`}
                                className={`todo-item todo-item-${index} flex flex-col md:flex-row items-start md:items-center justify-between p-2 rounded ${
                                    todo.completed ? "bg-green-100" : "bg-gray-50"
                                }`}
                                aria-label="Todo Item"
                            >
                                {isEditing ? (
                                    // EDIT MODE
                                    <div
                                        id={`todo-edit-mode-${todo.id}`}
                                        className="flex-1 flex items-center gap-2 w-full"
                                        aria-label="Todo Edit Mode"
                                    >
                                        <Input
                                            id={`todo-edit-input-${todo.id}`}
                                            type="text"
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                            disabled={!isCookieAccepted || op === "updating"}
                                            className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Edit Todo Input"
                                        />
                                        <Button
                                            id={`todo-save-button-${todo.id}`}
                                            onClick={handleSaveEdit}
                                            disabled={!isCookieAccepted || op === "updating"}
                                            className="bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Save Edited Todo"
                                        >
                                            {op === "updating" ? "Updating..." : "Save"}
                                        </Button>
                                        <Button
                                            id={`todo-cancel-button-${todo.id}`}
                                            onClick={handleCancelEdit}
                                            disabled={!isCookieAccepted || op === "updating"}
                                            className="bg-gray-400 hover:bg-gray-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Cancel Edit"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    // VIEW MODE
                                    <div
                                        id={`todo-view-mode-${todo.id}`}
                                        className="flex-1"
                                        aria-label="Todo View Mode"
                                    >
                                        <p
                                            id={`todo-text-${todo.id}`}
                                            className={todo.completed ? "line-through" : ""}
                                            aria-label="Todo Text"
                                        >
                                            {todo.text}
                                        </p>
                                        <p
                                            id={`todo-created-${todo.id}`}
                                            className="text-xs text-gray-500"
                                            aria-label="Todo Created At"
                                        >
                                            Created: {new Date(todo.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {/* ACTION BUTTONS */}
                                <div
                                    id={`todo-actions-${todo.id}`}
                                    className="flex gap-2 mt-2 md:mt-0"
                                    aria-label="Todo Actions"
                                >
                                    {/* EDIT */}
                                    {!isEditing && (
                                        <Button
                                            id={`todo-edit-button-${todo.id}`}
                                            onClick={() => handleEdit(todo)}
                                            disabled={!isCookieAccepted || op !== "none"}
                                            className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Edit Todo Button"
                                        >
                                            Edit
                                        </Button>
                                    )}

                                    {/* COMPLETE */}
                                    <Button
                                        id={`todo-complete-button-${todo.id}`}
                                        onClick={() => handleToggleComplete(todo.id)}
                                        disabled={
                                            !isCookieAccepted || op !== "none" || disableDeleteAndComplete
                                        }
                                        className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Complete Todo Button"
                                    >
                                        {op === "completing"
                                            ? "Completing..."
                                            : todo.completed
                                                ? "Undo"
                                                : "Complete"}
                                    </Button>

                                    {/* DELETE */}
                                    <Button
                                        id={`todo-delete-button-${todo.id}`}
                                        onClick={() => handleDelete(todo.id)}
                                        disabled={
                                            !isCookieAccepted || op !== "none" || disableDeleteAndComplete
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Delete Todo Button"
                                    >
                                        {op === "deleting" ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>)}
            </div>
        </div>
    );
};

export default TodoPage3;
