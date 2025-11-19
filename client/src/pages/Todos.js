import { useState, useEffect, useCallback } from "react";
import API from "../api/axios";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck } from "react-icons/fi";
import Loading from "../components/Loading";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState({ id: null, description: "" });
  const [editDescription, setEditDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await API.get("/todos");
      setTodos(res.data.data);
    } catch (err) {
      setError("Failed to fetch todos. Please try again.");
      console.error("Error fetching todos:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      setIsLoading(true);
      await API.post("/todos", {
        description,
      });
      setDescription("");
      await getTodos();
    } catch (err) {
      setError("Failed to add todo. Please try again.");
      console.error("Error adding todo:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setEditDescription(todo.description);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingTodo({ id: null, description: "" });
    setEditDescription("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editDescription.trim()) return;

    try {
      setIsLoading(true);
      await API.put(`/todos/${editingTodo.todo_id}`, {
        description: editDescription,
      });
      closeEditModal();
      await getTodos();
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error("Error updating todo:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = useCallback(async (id) => {
    try {
      setIsLoading(true);
      await API.delete(`/todos/${id}`);
      // await getTodos();
      // OR update todos state locally
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error("Error deleting todo:", err);
    } finally {
      setIsLoading(false);
    }
  }, [getTodos]);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-colors duration-200">
            Your Todo List
          </h1>
          <p className="text-gray-600 transition-colors duration-200">
            Organize your tasks efficiently
          </p>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-stretch gap-3 transition-colors duration-200">
            <label className="sr-only" htmlFor="new-todo">
              New todo
            </label>

            <div className="flex items-center flex-grow relative">
              <input
                id="new-todo"
                type="text"
                placeholder="What needs to be done?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 min-w-[120px] sm:min-w-[140px] h-[52px] sm:h-auto"
              disabled={!description.trim()}
            >
              <FiPlus size={18} />
              <span className="whitespace-nowrap">Add Task</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 transition-colors duration-200">
            {error}
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {isLoading && todos.length === 0 ? (
            <Loading type="card" text="Loading your todos..." />
          ) : todos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-200 transition-colors duration-200">
              <p className="text-gray-500 transition-colors duration-200">
                No todos yet. Add one above to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.todo_id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center flex-grow gap-3">
                      <span className="text-gray-800 transition-colors duration-200">
                        {todo.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(todo)}
                        className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.todo_id)}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors duration-200"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-200">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 transition-colors duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 transition-colors duration-200">
                Edit Todo
              </h2>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200">
                  Description
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows="3"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                />
              </div>

              {/* Button Row */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editDescription.trim()}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center"
                >
                  <FiCheck size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
