
import prisma from "../lib/prisma.js";

class TransactionService {
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
}


export default new TransactionService();