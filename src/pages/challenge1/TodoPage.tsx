import React, {useEffect, useState} from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {useAuth} from "../../context/AuthContext.tsx";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: number;
}

const LOCAL_STORAGE_KEY = "challenge1-todos";

const TodoPage: React.FC = () => {
    //const navigate = useNavigate();
    const {logout} = useAuth();

    // ----------------------------------------------------------------
    // 1) State initialization: load from local storage if present
    // ----------------------------------------------------------------
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (err) {
            console.error("Failed to parse todos:", err);
            return [];
        }
    });

    const [newTodoText, setNewTodoText] = useState("");
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");
    const [sortAsc, setSortAsc] = useState(true); // track ascending or descending

    // ----------------------------------------------------------------
    // 2) Sync to local storage whenever `todos` changes
    // ----------------------------------------------------------------
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    // ----------------------------------------------------------------
    // 3) Statistics: total, completed, incomplete
    // ----------------------------------------------------------------
    const totalCount = todos.length - 1;
    const completedCount = todos.filter((t) => !t.completed).length;
    const incompleteCount = todos.filter((t) => t.completed).length;

    // ----------------------------------------------------------------
    // 4) Add a New Todo
    // ----------------------------------------------------------------
    const handleAddTodo = () => {
        if (!newTodoText.trim()) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: newTodoText,
            completed: false,
            createdAt: Date.now(),
        };

        setTodos((prev) => [...prev, newTodo]);
        setNewTodoText("");
    };

    // ----------------------------------------------------------------
    // 5) Toggle the 'completed' status
    // ----------------------------------------------------------------
    const handleToggleComplete = (id: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // ----------------------------------------------------------------
    // 6) Delete a Todo
    // ----------------------------------------------------------------
    const handleDelete = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // ----------------------------------------------------------------
    // 7) Edit a Todo
    // ----------------------------------------------------------------
    const handleEdit = (todo: Todo) => {
        setEditingTodoId(todo.id);
        setEditingText(todo.text);
    };

    const handleSaveEdit = () => {
        if (editingTodoId === null) return;

        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === editingTodoId ? { ...todo, text: editingText } : todo
            )
        );
        setEditingTodoId(null);
        setEditingText("");
    };

    // ----------------------------------------------------------------
    // 8) Sort by createdAt (Asc or Desc)
    // ----------------------------------------------------------------
    const toggleSortOrder = () => {
        setSortAsc((prev) => !prev);
    };

    // Sort a copy of the todos array before rendering
    const sortedTodos = [...todos].sort((a, b) => {
        if (sortAsc) return a.createdAt - b.createdAt; // ascending
        return b.createdAt - a.createdAt; // descending
    });

    return (
        <div
            id="todo-page-container"
            className="min-h-screen bg-gray-100 p-6 flex flex-col"
            aria-label="Todo Page Container"
            data-testid="todo-page-container"
        >
            {/* Logout Button */}
            <div
                id="todo-page-header"
                className="flex justify-end mb-4"
                aria-label="Header Section"
            >

                <Button
                    id="todo-logout-button"
                    className="logout-btn"
                    onClick={logout}
                    aria-label="Logout Button"
                    data-testid="logout-button"
                >
                    <a href={"/challenge-1/login"}>Logout</a>
                </Button>
            </div>

            <div
                id="todo-page-main"
                className="max-w-xl w-full mx-auto bg-white p-6 shadow-lg rounded"
                aria-label="Todo Main Section"
                data-testid="todo-page-main"
            >
                <h1
                    id="todo-title"
                    className="text-2xl font-bold mb-4 text-center"
                    aria-label="Todo Page Title"
                    data-testid="todo-page-title"
                >
                    My Todo List | Challenge 1
                </h1>

                {/* Status: total, completed, incomplete */}
                <div
                    id="todo-status-container"
                    className="mb-4 flex justify-around text-sm text-gray-600"
                    aria-label="Todo Status Container"
                    data-testid="todo-status-container"
                >
                    <p
                        id="todo-status-total"
                        aria-label="Total Todos"
                        data-testid="todo-status-total"
                    >
                        <span className="font-semibold">Total:</span> {totalCount}
                    </p>
                    <p
                        id="todo-status-completed"
                        aria-label="Completed Todos"
                        data-testid="todo-status-completed"
                    >
                        <span className="font-semibold">Completed:</span> {completedCount}
                    </p>
                    <p
                        id="todo-status-incomplete"
                        aria-label="Incomplete Todos"
                        data-testid="todo-status-incomplete"
                    >
                        <span className="font-semibold">Incomplete:</span> {incompleteCount}
                    </p>
                </div>

                {/* ADD NEW TODO */}
                <div
                    id="todo-add-container"
                    className="mb-4 flex gap-2"
                    aria-label="Add New Todo Container"
                    data-testid="todo-add-container"
                >
                    <Input
                        id="todo-new-input"
                        type="text"
                        placeholder="Enter new todo"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        className="flex-1"
                        aria-label="New Todo Input"
                        data-testid="todo-new-input"
                    />
                    <Button
                        id="todo-add-button"
                        className="add-btn"
                        aria-label="Add Todo Button"
                        data-testid="todo-add-button"
                        onClick={handleAddTodo}
                    >
                        Add
                    </Button>
                </div>

                {/* SORT BUTTON */}
                <div
                    id="todo-sort-container"
                    className="mb-4 text-right"
                    aria-label="Sort Container"
                    data-testid="todo-sort-container"
                >
                    <Button
                        id="todo-sort-button"
                        className="bg-gray-600 hover:bg-gray-700 sort-btn"
                        aria-label="Toggle Sort Order"
                        data-testid="todo-sort-button"
                        onClick={toggleSortOrder}
                    >
                        Sort {sortAsc ? "Descending" : "Ascending"}
                    </Button>
                </div>

                {/* TODO LIST (sorted) */}
                <ul
                    id="todo-list"
                    className="space-y-2"
                    aria-label="List of Todos"
                    data-testid="todo-list"
                >
                    {sortedTodos.map((todo) => (
                        <li
                            key={todo.id}
                            id={`todo-item-${todo.id}`}
                            className={`flex flex-col md:flex-row items-start md:items-center justify-between p-2 rounded ${
                                todo.completed ? "bg-green-100" : "bg-gray-50"
                            }`}
                            aria-label="Todo Item"
                            data-testid={`todo-item-${todo.id}`}
                        >
                            {/* LEFT: The text or edit mode */}
                            {editingTodoId === todo.id ? (
                                // EDIT MODE
                                <div
                                    id={`todo-edit-mode-${todo.id}`}
                                    className="flex-1 flex items-center gap-2 w-full"
                                    aria-label="Todo Edit Mode"
                                    data-testid={`todo-edit-mode-${todo.id}`}
                                >
                                    <Input
                                        id={`todo-edit-input-${todo.id}`}
                                        type="text"
                                        aria-label="Edit Todo Input"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        className="flex-1 todo-input-edit"
                                    />
                                    <Button
                                        id={`todo-save-button-${todo.id}`}
                                        aria-label="Save Edit Button"
                                        className={"todo-button-save-edit"}
                                        onClick={handleSaveEdit}
                                    >
                                        Save
                                    </Button>
                                </div>
                            ) : (
                                // VIEW MODE
                                <div
                                    id={`todo-view-mode-${todo.id}`}
                                    className="flex-1"
                                    aria-label="Todo View Mode"
                                    data-testid={`todo-view-mode-${todo.id}`}
                                >
                                    <p
                                        id={`todo-text-${todo.id}`}
                                        className={todo.completed ? "line-through" : ""}
                                        aria-label="Todo Text"
                                        data-testid={`todo-text-${todo.id}`}
                                    >
                                        {todo.text}
                                    </p>
                                    <p
                                        id={`todo-created-${todo.id}`}
                                        className="text-xs text-gray-500"
                                        aria-label="Todo Created At"
                                        data-testid={`todo-created-${todo.id}`}
                                    >
                                        Created: {new Date(todo.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            )}

                            {/* RIGHT: Action buttons */}
                            <div
                                id={`todo-actions-${todo.id}`}
                                className="flex gap-2 mt-2 md:mt-0"
                                aria-label="Todo Action Buttons"
                                data-testid={`todo-actions-${todo.id}`}
                            >
                                {editingTodoId !== todo.id && (
                                    <Button
                                        id={`todo-edit-button-${todo.id}`}
                                        className="bg-yellow-500 hover:bg-yellow-600 todo-button-edit"
                                        aria-label="Edit Todo Button"
                                        onClick={() => handleEdit(todo)}
                                    >
                                        Edit
                                    </Button>
                                )}
                                <Button
                                    id={`todo-complete-button-${todo.id}`}
                                    className="bg-green-600 hover:bg-green-700 todo-button-complete"
                                    aria-label="Toggle Complete Button"
                                    onClick={() => handleToggleComplete(todo.id)}
                                >
                                    {todo.completed ? "Undo" : "Complete"}
                                </Button>
                                <Button
                                    id={`todo-delete-button-${todo.id}`}
                                    className="bg-red-600 hover:bg-red-700 todo-button-delete"
                                    aria-label="Delete Todo Button"
                                    onClick={() => handleDelete(todo.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoPage;
