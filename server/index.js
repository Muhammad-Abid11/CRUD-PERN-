import "dotenv/config";
import express from "express";
import cors from "cors";
import connectedDB from "./db.js";
import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.routes.js";

connectedDB();
const app = express();

app.use(cors());

app.use(express.json()); //middleware

// Todo routes
app.use("/todos", todoRoutes);

// Auth routes
app.use("/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
