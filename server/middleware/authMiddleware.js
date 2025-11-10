import jwt from "jsonwebtoken";
import { isTokenValid } from "../utils/jwt.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = isTokenValid(token);

    req.user = decoded; // attach user data
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
