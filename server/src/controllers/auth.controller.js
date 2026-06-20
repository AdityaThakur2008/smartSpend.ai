import { registerSchema } from "../validators/auth.validator.js";
import AuthService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { COOKIE_NAME } from "../constants/auth.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await AuthService.register(req.validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });


  login = asyncHandler(async (req, res) => {
    const user = await AuthService.login(req.validatedData);

    return res.status(200).cookie(COOKIE_NAME, user.accessToken, {
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({ 
      success: true,
      message: "User logged in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });

  getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user; 
    return res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
}

export default new AuthController();
