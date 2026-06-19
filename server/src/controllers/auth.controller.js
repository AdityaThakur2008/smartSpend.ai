import { registerSchema } from "../validators/auth.validator.js";
import AuthService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await AuthService.register(req.validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });
}

export default new AuthController();
