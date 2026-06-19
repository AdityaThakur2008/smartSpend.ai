import { Router } from "express";

import AuthController from "../controllers/auth.controller.js";
import validatorMiddleware from "../middlewares/validate.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/register",
  validatorMiddleware(registerSchema),
  
  AuthController.register,
);

export default router;
