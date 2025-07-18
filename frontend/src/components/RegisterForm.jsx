import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "https://task-manager-api-kohl-three.vercel.app";


export default function RegisterForm({ onRegistered }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("Submitting form:", form);

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (res.ok) {
        navigate("/")
        onRegistered(); // call the callback to switch page or show success
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Register error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="border p-2 mb-3 w-full rounded"
      />
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
        className="border p-2 mb-3 w-full rounded"
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
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
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Register
      </button>
      <p className="mt-4 text-sm text-center">
          Already registered?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
               onClick={() => navigate("/")}
            >
              Login here
            </span>
      </p>

    </form>
  );
}
