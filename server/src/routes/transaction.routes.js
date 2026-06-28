import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  TransactionSchema,
  updateTransactionSchema,
} from "../validators/transaction.validator.js";
import TransactionController from "../controllers/transaction.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(TransactionSchema),
  TransactionController.createTransaction,
);
router.get("/", authMiddleware, TransactionController.getTransactionsByUserId);
router.get("/:id", authMiddleware, TransactionController.getTransactionById);
router.patch(
  "/:id",
  authMiddleware,
  validate(updateTransactionSchema),
  TransactionController.updateTransaction,
);
router.delete(
  "/:id",
  authMiddleware, 
  TransactionController.deleteTransaction
);

export default router;
