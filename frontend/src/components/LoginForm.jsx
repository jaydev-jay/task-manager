import { useState } from "react";
const API_URL = "https://task-manager-api-kohl-three.vercel.app";


export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    const res = await fetch(`${API_URL}/api/login`,  {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.status === 200 && data.data?.token) {
      localStorage.setItem("token", data.data.token);
      
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
        className="border p-2 mb-3 w-full rounded"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="border p-2 mb-3 w-full rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Login
      </button>
    </form>
  );
}
