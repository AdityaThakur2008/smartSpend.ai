import { verifyAccessToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import prisma from "../lib/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import { COOKIE_NAME } from "../constants/auth.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];
 
  if (!token) {
    throw new AppError("Access denied. No token provided.", 401);
  }
  try {
    const decoded = verifyAccessToken(token);
   
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      throw new AppError("User not found.", 401);
    }
    req.user = user;
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token.", 401);
  }
});

export default authMiddleware;
