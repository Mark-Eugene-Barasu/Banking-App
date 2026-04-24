import { Router } from "express";
import { getAccounts, getAccount, createAccount } from "../controllers/accounts";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);
router.get("/", getAccounts);
router.get("/:id", getAccount);
router.post("/", createAccount);

export default router;
