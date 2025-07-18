import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const API_BASE_URL = "https://task-manager-api-kohl-three.vercel.app";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/todolist`, {
        headers: { auth: token },
      });
      const data = await res.json();
      if (data.status === 200) {
        setTodos(data.data.todos || []);
        setUser(data.data.name || "User"); // assuming backend sends user name
      } else {
        setError(data.message || "Failed to fetch todos");
      }
    } catch (err) {
      setError("Error fetching todos.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoCreated = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleComplete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/marktodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify({ todo_id: id }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? data.data : todo))
        );
      }
    } catch {
      setError("Error toggling todo.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/deletetodo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify({ todo_id: id }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch {
      setError("Error deleting todo.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Welcome, {user || "User"}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <TodoForm onTodoCreated={handleTodoCreated} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        onDelete={handleDelete}
        error={error}
      />
    </div>
  );
}
