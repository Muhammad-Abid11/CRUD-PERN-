import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  return jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // token valid for 1 day
  );
};

export const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
