import { Router } from "express";
import { purchaseTicket } from "../controllers/transactionController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// POST /api/v1/transactions
// Hanya User Login yang bisa beli
router.post("/", authenticateToken, purchaseTicket);

export default router;
