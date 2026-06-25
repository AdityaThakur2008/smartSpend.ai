import { z } from "zod";

const TransactionTypeEnum = z.enum(["INCOME", "EXPENSE"]);

const CategoryEnum = z.enum([
  "FOOD",
  "TRAVEL",
  "SHOPPING",
  "HEALTH",
  "BILLS",
  "EDUCATION",
  "ENTERTAINMENT",
  "SALARY",
  "OTHER",
]);

export const TransactionSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long")   ,
  amount: z.number().positive("Amount must be a positive number").finite("Amount must be a finite number"),
  type: TransactionTypeEnum,
  category: CategoryEnum,
  note: z.string().trim().max(500, "Note must be at most 500 characters long").optional(),
  date: z.coerce.date().optional(),
});
