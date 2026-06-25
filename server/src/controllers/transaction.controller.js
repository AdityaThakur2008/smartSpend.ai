import TransactionService from "../services/transaction.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { TransactionSchema } from "../validators/transaction.validator.js";

class TransactionController {
  createTransaction = asyncHandler(async (req, res) => {
    const transactionData = req.validatedData;
    const userId = req.user.id;

    const newTransaction = await TransactionService.createTransaction(
      transactionData,
      userId,
    );

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: newTransaction,
    });
  });
}

export default new TransactionController();
