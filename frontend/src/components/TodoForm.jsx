import { useState } from "react";

const API_BASE_URL = "https://task-manager-api-kohl-three.vercel.app";

export default function TodoForm({ onTodoCreated }) {
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/createtodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: token, // ✅ backend is using "auth" in headers
        },
        body: JSON.stringify({ desc }),
      });

      const data = await res.json();

      if (data.status === 200) {
        setDesc("");
        onTodoCreated(data.data);
      } else {
        setError(data.message || "Failed to create todo");
      }
    } catch (err) {
      console.error("Todo creation error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded my-6"
    >
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <input
        type="text"
        placeholder="New todo description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        required
        className="border p-2 rounded w-full mb-3"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
      >
        Add Todo
      </button>
    </form>
  );
}
