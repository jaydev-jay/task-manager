
export default function TodoList({ todos, toggleComplete, onDelete, error }) {
  if (error) {
    return <div className="max-w-md mx-auto mt-6 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded my-6">
      <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`flex justify-between items-center border-b py-2 ${
                todo.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              <span className="flex-1">{todo.desc}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(todo._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 text-sm"
                >
                  {todo.isCompleted ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => onDelete(todo._id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
