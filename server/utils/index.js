import { pool } from "../db.js";

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

const Is_EXIST = async (res, table, id) => {
  const response = await pool.query(
    `SELECT * FROM public.${table} WHERE todo_id = $1`,
    [id]
  );
  // if todo not found
  if (!response.rows[0]) {
    res.status(404).json({ message: "Todo not found" });
    return null;
  }
  // if todo found
  return response;
};

export { SuccessRESPONSE, ErrorResponse, Is_EXIST };
