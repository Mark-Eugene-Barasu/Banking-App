import { Response } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { AuthRequest } from "../middleware/auth";

const generateAccountNumber = () =>
  Math.floor(1000000000 + Math.random() * 9000000000).toString();

const createAccountSchema = z.object({
  type: z.enum(["CHECKING", "SAVINGS", "INVESTMENT"]),
});

export const getAccounts = async (req: AuthRequest, res: Response) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId: req.userId },
      include: {
        sentTransactions: { orderBy: { createdAt: "desc" }, take: 5 },
        receivedTransactions: { orderBy: { createdAt: "desc" }, take: 5 },
      },
    });
    res.json(accounts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAccount = async (req: AuthRequest, res: Response) => {
  try {
    const account = await prisma.account.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: {
        sentTransactions: {
          orderBy: { createdAt: "desc" },
          include: { receiverAccount: true },
        },
        receivedTransactions: {
          orderBy: { createdAt: "desc" },
          include: { senderAccount: true },
        },
      },
    });
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createAccount = async (req: AuthRequest, res: Response) => {
  try {
    const { type } = createAccountSchema.parse(req.body);
    const account = await prisma.account.create({
      data: { accountNumber: generateAccountNumber(), type, userId: req.userId! },
    });
    res.status(201).json(account);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.errors });
    res.status(500).json({ message: "Server error" });
  }
};
