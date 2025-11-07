import "dotenv/config";
import express from "express";
import cors from "cors";
import connectedDB, { pool } from "./db.js";

connectedDB();
const app = express();

app.use(cors());

app.use(express.json()); //middleware

const SuccessRESPONSE = ({ res, message, data, status }) => {
  return res.json({ message, data, status });
};

const ErrorResponse = ({
  res,
  message = "Server error",
  error,
  status = "error",
}) => {
  return res.status(500).json({ message, error, status });
};

// Helpers functions that search todo by id either exist or not
const TODO_EXIST = async (res, id) => {
  const response = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
    id,
  ]);
  // if todo not found
  if (!response.rows[0]) {
    res.status(404).json({ message: "Todo not found" });
    return null;
  }
  // if todo found
  return response;
};

// 📘 Get all todos
app.get("/todos", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM todo");
    SuccessRESPONSE({
      res,
      message: "Todos found successfully",
      data: response.rows,
      status: "success",
    });
  } catch (err) {
    console.error(err);
    ErrorResponse({
      res,
      error: err.message,
    });
  }
});

// 📘 Get a single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const response = await TODO_EXIST(res, req.params.id);
    if (!response) return;
    SuccessRESPONSE({
      res,
      message: "Todo found successfully",
      data: response.rows[0],
      status: "success",
    });
  } catch (err) {
    console.error(err);
    ErrorResponse({
      res,
      error: err.message,
    });
  }
});

// ➕ Create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const response = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    /*
    INSERT INTO --> insert data into todo table
    todo --> table name
    (description) --> column name
    VALUES($1) --> values
    $1 --> description
    RETURNING * --> return all columns
    */
    SuccessRESPONSE({
      res,
      message: "Todo created successfully",
      data: response.rows[0],
      status: "success",
    });
  } catch (err) {
    console.error(err);
    ErrorResponse({
      res,
      error: err.message,
    });
  }
});

// ✏️ Update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const exists = await TODO_EXIST(res, id);
    if (!exists) return;

    const response = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );

    SuccessRESPONSE({
      res,
      message: "Todo updated successfully",
      data: response.rows[0],
      status: "success",
    });
  } catch (err) {
    console.error(err);
    ErrorResponse({
      res,
      error: err.message,
    });
  }
});

// 🗑️ Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const exists = await TODO_EXIST(res, req.params.id);
    if (!exists) return;

    const response = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [req.params.id]
    );

    SuccessRESPONSE({
      res,
      message: "Todo deleted successfully",
      data: response.rows[0],
      status: "success",
    });
  } catch (err) {
    console.error(err);
    ErrorResponse({
      res,
      error: err.message,
    });
  }
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
