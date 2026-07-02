export const formatTransaction = (transaction) => {
  return {
    id: transaction.id,
    title: transaction.title,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    note: transaction.note,
    date: transaction.date,
  };
};

export const formatTransactions = (transactions) => {
  return transactions.map((transaction) => formatTransaction(transaction));
}
