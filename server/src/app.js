import express from "express";
import cors from "cors";
import apiCheckRouter from "./routes/apiCheck.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiCheckRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use(errorMiddleware);

export default app;
