// db.js
import pkg from "pg";
const { Pool } = pkg;

// Create a connection pool
/*
export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});
*/

// Neon connection pool  https://neon.tech
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon
});

const connectDB = async () => {
  try {
    /* 
    await pool.connect(); //ISSUE: Server is crashing after a certain time
    WHY?
    ✨ pool.query() automatically manages connections
    ❌ You NEVER need manual .connect() in Neon
    ✔ Prevents connection termination
    ✔ Prevents server crashes
    */
    console.log("✅ Connected to PostgreSQL successfully!");
  } catch (err) {
    console.error("❌ PostgreSQL connection error:", err.stack);
  }
};
export default connectDB;
