import { Router } from "express";
import { pool } from "../db.js";
import { SuccessRESPONSE, ErrorResponse, Is_EXIST } from "../utils/index.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const app = Router();

// 📘 Get all todos
app.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id; // coming from JWT

    const response = await pool.query("SELECT * FROM public.todo WHERE user_id = $1 ORDER BY todo_id DESC", [
      userId,
    ]);
    SuccessRESPONSE({
      res,
      message: "Todos found successfully",
      data: response.rows,
      status: "success",
    });
  } catch (err) {
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
app.post("/", verifyToken, async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user.user_id; // coming from JWT
    const response = await pool.query(
      "INSERT INTO public.todo (description, user_id) VALUES($1, $2) RETURNING *",
      [description, userId]
    );
    /*
    INSERT INTO --> insert data into todo table
    todo --> table name
    (description, user_id) --> column names
    VALUES($1, $2) --> values
    $1 --> description
    $2 --> user_id
    RETURNING * --> return all columns
    */
    SuccessRESPONSE({
      res,
      message: "Todo created successfully",
      data: response.rows[0],
      status: "success",
    });
  } catch (err) {
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
      "UPDATE public.todo SET description = $1 WHERE todo_id = $2 RETURNING *",
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
      "DELETE FROM public.todo WHERE todo_id = $1 RETURNING *",
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
