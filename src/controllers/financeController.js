import expenses from "../models/expenseModel.js";
import projects from "../models/projectModel.js";

export const getTransactions = async (req, res) => {
  try {
    const allExpenses = await expenses.find();
    res.status(200).json(allExpenses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await expenses.findById(req.params.id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const lastTransaction = await expenses
      .findOne()
      .sort({ transactionId: -1 });

    const nextId = lastTransaction ? lastTransaction.transactionId + 1 : 1;
    // const project = await project.findOne({ name: req.body.name });

    const newTransaction = await expenses.create({
      transactionId: nextId,
      projectId: req.body.projectId,
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
    });

    res.status(200).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await expenses.findIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ msg: `Transaction ${id} not found` });
    }

    const updatedTransaction = await expenses.findById(id);
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updatedTransaction = updateTransaction;

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await expenses.findByIdAndDelete(id);
    if (!transaction) {
      res.status(404).json({ msg: `Transaction ${id} not found` });
    }

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
