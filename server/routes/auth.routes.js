import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import { createJWT } from "../utils/jwt.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing email
    const userExist = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashedPassword]
    );

    const token = createJWT(newUser.rows[0]);

    return res.json({
      message: "User registered",
      token,
      user: newUser.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    const user = result.rows[0];
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = createJWT(user);

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET CURRENT USER
router.get("/me", verifyToken, async (req, res) => {
  const user = await pool.query(
    "SELECT user_id, name, email FROM users WHERE user_id=$1",
    [req.user.user_id]
  );

  res.json({ user: user.rows[0] });
});

export default router;
