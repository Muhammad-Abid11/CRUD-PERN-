import { useState, useEffect } from "react";
import API from "../api/axios";
export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState({ id: null, description: "" });
  const [editDescription, setEditDescription] = useState("");

  const getTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data.data);
  };

  const addTodo = async () => {
    await API.post("/todos", { description });
    setDescription("");
    getTodos();
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

    await API.put(`/todos/${editingTodo.todo_id}`, {
      description: editDescription,
    });
    closeEditModal();
    getTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Todos</h2>

      <div className="d-flex gap-2 my-3">
        <input
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.todo_id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo.description}
            <button
              className="btn btn-sm btn-warning float-end"
              onClick={() => openEditModal(todo)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger float-end me-2"
              onClick={() => deleteTodo(todo.todo_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Edit Todo Modal */}
      {showEditModal && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Todo</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={closeEditModal}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editDescription"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeEditModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
