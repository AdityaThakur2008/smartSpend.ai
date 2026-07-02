import prisma from "../lib/prisma.js";
import AppError from "../utils/appError.js";
import {formatTransaction , formatTransactions} from "../utils/transactionFormatter.js";




class  DashboardService {

    async summary(userId) {
        const totalIncome = await prisma.transaction.aggregate({
            where: { userId, type: 'INCOME' },
            _sum: { amount: true },
        });
        const totalExpense = await prisma.transaction.aggregate({
            where: { userId, type: 'EXPENSE' },
            _sum: { amount: true },
        });
        const totalTransactions = await prisma.transaction.count({
            where: { userId },
        });
        const totalBalance = (totalIncome._sum.amount || 0) - (totalExpense._sum.amount || 0);
        const recentTransactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 5,
        });

        return {
            totalIncome: totalIncome._sum.amount || 0,
            totalExpense: totalExpense._sum.amount || 0,
            totalBalance,
            totalTransactions,
            recentTransactions: formatTransactions(recentTransactions),
        };
    }

    async summaryByCategory(userId) {
        const summaryByCategory = await prisma.transaction.groupBy({
            by: ['category'],
            where: { userId , type: 'EXPENSE' },
            _sum: { amount: true },
            orderBy: { _sum: { amount: 'desc' } },
        });

        const formattedSummary = summaryByCategory.map((item) => ({
            category: item.category,
            totalAmount: item._sum.amount || 0,
        }));
        return formattedSummary;
    }
}
export default new DashboardService();