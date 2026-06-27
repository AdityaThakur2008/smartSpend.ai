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

  getTransactionsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const transactions = await TransactionService.getTransactions(userId);

    return res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  });

  getTransactionById = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const userId = req.user.id;

    const transaction = await TransactionService.getTransactionById(
      transactionId,
      userId,
    );

    return res.status(200).json({
      success: true,
      message: "Transaction retrieved successfully",
      data: transaction,
    });
  });

  updateTransaction = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const userId = req.user.id;
    const updateData = req.validatedData;

    const updatedTransaction = await TransactionService.updateTransaction(
      transactionId,
      userId,
      updateData,
    );

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  });

  deleteTransaction = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const userId = req.user.id;

    const deletedTransaction = await TransactionService.deleteTransaction(
      transactionId,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: deletedTransaction,
    });
  });
}

export default new TransactionController();
