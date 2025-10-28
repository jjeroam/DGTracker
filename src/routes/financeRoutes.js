import express from "express";
import { getTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } from '../controllers/financeController.js'
const router = express.Router();

router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.post("/", createTransaction);
router.put("/id", updateTransaction);
router.post("/id", deleteTransaction);

export default router;
