import e from "express";
import express from "express";
const router = express.Router();

// Sample data for finances
let finances = [
  { id: 1, type: "Income", amount: 5000, description: "Project payment" },
  { id: 2, type: "Expense", amount: 1500, description: "Material purchase" },
  { id: 3, type: "Income", amount: 3000, description: "Consulting fee" },
  { id: 4, type: "Expense", amount: 800, description: "Equipment rental" },
];

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(finances.slice(0, limit));
  }

  res.status(200).json(finances);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const finance = finances.find((finance) => finance.id === id);
  if (!finance) {
    return res.status(404).json({ error: "Finance record not found" });
  }

  res.status(200).json(finance);
});

export default router;
