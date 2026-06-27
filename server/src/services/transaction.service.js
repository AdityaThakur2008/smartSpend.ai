import prisma from "../lib/prisma.js";
import AppError from "../utils/appError.js";

class TransactionService {
  // for create transaction
  async createTransaction(transactionData, userId) {
    const { title, amount, type, category, note, date } = transactionData;

    const newTransaction = await prisma.transaction.create({
      data: {
        title,
        amount,
        type,
        category,
        note,
        date: date ?? new Date(),
        userId,
      },
    });

    return {
      id: newTransaction.id,
      title: newTransaction.title,
      amount: newTransaction.amount,
      type: newTransaction.type,
      category: newTransaction.category,
      note: newTransaction.note,
      date: newTransaction.date,
    };
  }

  // for get all transactions by user id

  async getTransactions(userId) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return transactions.map((transaction) => ({
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      note: transaction.note,
      date: transaction.date,
    }));
  }

  // for get transaction by id
  async getTransactionById(transactionId, userId) {
    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });

    if (!transaction) {
      throw new AppError("Transaction not found", 404);
    }
    return {
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      note: transaction.note,
      date: transaction.date,
    };
  }

  // for update transaction
  async updateTransaction(transactionId, userId, updateData) {
    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });

    if (!transaction) {
      throw new AppError("Transaction not found", 404);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: updateData,
    });

    return {
      id: updatedTransaction.id,
      title: updatedTransaction.title,
      amount: updatedTransaction.amount,
      type: updatedTransaction.type,
      category: updatedTransaction.category,
      note: updatedTransaction.note,
      date: updatedTransaction.date,
    };
  }

  // for delete transaction
  async deleteTransaction(transactionId, userId) {
    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });

    if (!transaction) {
      throw new AppError("Transaction not found", 404);
    }

    await prisma.transaction.delete({
      where: { id: transactionId },
    });

    return {
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      note: transaction.note,
      date: transaction.date,
    };
  }


}

export default new TransactionService();
