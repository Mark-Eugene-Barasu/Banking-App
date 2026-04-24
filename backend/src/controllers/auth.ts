import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "../prisma";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const generateAccountNumber = () =>
  Math.floor(1000000000 + Math.random() * 9000000000).toString();

const signToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashed,
        accounts: {
          create: {
            accountNumber: generateAccountNumber(),
            type: "CHECKING",
            balance: 0,
          },
        },
      },
      include: { accounts: true },
    });

    const { password: _, ...userWithoutPassword } = user;
    const token = signToken(user.id);
    res.status(201).json({ token, user: userWithoutPassword });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.errors });
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { accounts: true },
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const { password: _, ...userWithoutPassword } = user;
    const token = signToken(user.id);
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.errors });
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { accounts: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
