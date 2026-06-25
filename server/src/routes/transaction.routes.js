import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { TransactionSchema } from "../validators/transaction.validator.js";
import TransactionController from "../controllers/transaction.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(TransactionSchema),
  TransactionController.createTransaction,
);

export default router;
