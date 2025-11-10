import { Router } from "express";
import { pool } from "../db.js";
import { SuccessRESPONSE, ErrorResponse, Is_EXIST } from "../utils/index.js";

const app = Router();

// 📘 Get all todos
app.get("/", async (req, res) => {
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
app.get("/:id", async (req, res) => {
  try {
    const response = await Is_EXIST(res, "todo", req.params.id);
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
app.post("/", async (req, res) => {
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
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const exists = await Is_EXIST(res, "todo", id);
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
app.delete("/:id", async (req, res) => {
  try {
    const exists = await Is_EXIST(res, "todo", req.params.id);
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

export default app;
