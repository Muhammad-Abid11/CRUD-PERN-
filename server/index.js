import "dotenv/config";
import express from "express";
import cors from "cors";

import connectedDB from "./db.js"; // use underscore so it's looks it is in used
connectedDB();
const app = express();

app.use(cors());

// middleware
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost: ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});
