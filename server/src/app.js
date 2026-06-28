import express from "express";
import cors from "cors";
import apiCheckRouter from "./routes/apiCheck.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import transactionRouter from "./routes/transaction.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiCheckRouter);
app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use(errorMiddleware);

export default app;
