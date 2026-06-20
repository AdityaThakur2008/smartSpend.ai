import jwt from "jsonwebtoken";
import AppError from "./AppError.js";

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const accesstoken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return accesstoken;
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};

export { generateAccessToken, verifyAccessToken };
