import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import accountRoutes from "./routes/accounts";
import transactionRoutes from "./routes/transactions";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
