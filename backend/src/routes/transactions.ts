import { Router } from "express";
import { getTransactions, deposit, withdraw, transfer } from "../controllers/transactions";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.get("/", getTransactions);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/transfer", transfer);

export default router;
