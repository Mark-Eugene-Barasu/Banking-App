import { Response } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { AuthRequest } from "../middleware/auth";

const updateSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { accounts: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password: _, ...safe } = user;
    res.json(safe);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const data = updateSchema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.userId },
      data,
    });
    const { password: _, ...safe } = user;
    res.json(safe);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ errors: err.errors });
    res.status(500).json({ message: "Server error" });
  }
};
