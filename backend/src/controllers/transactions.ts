import { Response } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { AuthRequest } from "../middleware/auth";

const depositSchema = z.object({
  accountId: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

const withdrawSchema = z.object({
  accountId: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

const transferSchema = z.object({
  fromAccountId: z.string(),
  toAccountNumber: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userAccounts = await prisma.account.findMany({
      where: { userId: req.userId },
      select: { id: true },
    });
    const accountIds = userAccounts.map((a) => a.id);

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { senderAccountId: { in: accountIds } },
          { receiverAccountId: { in: accountIds } },
        ],
      },
      include: {
        senderAccount: true,
        receiverAccount: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(transactions);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deposit = async (req: AuthRequest, res: Response) => {
  try {
    const { accountId, amount, description } = depositSchema.parse(req.body);

    const account = await prisma.account.findFirst({
      where: { id: accountId, userId: req.userId },
    });
    if (!account) return res.status(404).json({ message: "Account not found" });

    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          amount,
          type: "DEPOSIT",
          status: "COMPLETED",
          description,
          receiverAccountId: accountId,
        },
      }),
      prisma.account.update({
        where: { id: accountId },
        data: { balance: { increment: amount } },
      }),
    ]);

    res.status(201).json(transaction);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.errors });
    res.status(500).json({ message: "Server error" });
  }
};

export const withdraw = async (req: AuthRequest, res: Response) => {
  try {
    const { accountId, amount, description } = withdrawSchema.parse(req.body);

    const account = await prisma.account.findFirst({
      where: { id: accountId, userId: req.userId },
    });
    if (!account) return res.status(404).json({ message: "Account not found" });
    if (account.balance < amount) return res.status(400).json({ message: "Insufficient funds" });

    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          amount,
          type: "WITHDRAWAL",
          status: "COMPLETED",
          description,
          senderAccountId: accountId,
        },
      }),
      prisma.account.update({
        where: { id: accountId },
        data: { balance: { decrement: amount } },
      }),
    ]);

    res.status(201).json(transaction);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.errors });
    res.status(500).json({ message: "Server error" });
  }
};

export const transfer = async (req: AuthRequest, res: Response) => {
  try {
    const { fromAccountId, toAccountNumber, amount, description } = transferSchema.parse(req.body);

    const fromAccount = await prisma.account.findFirst({
      where: { id: fromAccountId, userId: req.userId },
    });
    if (!fromAccount) return res.status(404).json({ message: "Source account not found" });
    if (fromAccount.balance < amount) return res.status(400).json({ message: "Insufficient funds" });

    const toAccount = await prisma.account.findUnique({
      where: { accountNumber: toAccountNumber },
    });
    if (!toAccount) return res.status(404).json({ message: "Destination account not found" });
    if (toAccount.id === fromAccountId) return res.status(400).json({ message: "Cannot transfer to same account" });

    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          amount,
          type: "TRANSFER",
          status: "COMPLETED",
          description,
          senderAccountId: fromAccountId,
          receiverAccountId: toAccount.id,
        },
      }),
      prisma.account.update({
        where: { id: fromAccountId },
        data: { balance: { decrement: amount } },
      }),
      prisma.account.update({
        where: { id: toAccount.id },
        data: { balance: { increment: amount } },
      }),
    ]);

    res.status(201).json(transaction);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.errors });
    res.status(500).json({ message: "Server error" });
  }
};
