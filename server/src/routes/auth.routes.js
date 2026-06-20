import { Router } from "express";

import AuthController from "../controllers/auth.controller.js";
import validatorMiddleware from "../middlewares/validate.middleware.js";
import { registerSchema , loginSchema} from "../validators/auth.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validatorMiddleware(registerSchema),
  AuthController.register,
);
router.post("/login", validatorMiddleware(loginSchema), AuthController.login);
router.get("/me", authMiddleware,AuthController.getCurrentUser);

export default router;
