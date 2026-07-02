import prisma from "../lib/prisma.js";
import AppError from "../utils/appError.js";
import { formatTransaction, formatTransactions } from "../utils/transactionFormatter.js";

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
    const formattedTransaction = formatTransaction(newTransaction);
    return formattedTransaction;
  }

  // for get all transactions by user id

  async getTransactions({ userId, page, limit, type, category, search }) {
    const where = {
      userId,
      ...(type && { type }),
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { note: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const totalCount = await prisma.transaction.count({ where });
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.max(1, Math.min(50, parseInt(limit) || 10));
    const skip = (pageNumber - 1) * pageSize;

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: "desc" },
      skip,
      take: pageSize,
    });

    const data = formatTransactions(transactions);


    const totalPages = Math.ceil(totalCount / pageSize);
    const pagination = {
      totalCount,
      totalPages,
      currentPage: pageNumber,
      pageSize,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    };

    return { data, pagination };
  }

  // for get transaction by id
  async getTransactionById(transactionId, userId) {
    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });

    if (!transaction) {
      throw new AppError("Transaction not found", 404);
    }

    const formattedTransaction = formatTransaction(transaction);
    return formattedTransaction;
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

    const formattedTransaction = formatTransaction(updatedTransaction);
    return formattedTransaction;
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

    const formattedTransaction = formatTransaction(transaction);
    return formattedTransaction;
  }
}

export default new TransactionService();
