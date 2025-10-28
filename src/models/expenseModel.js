import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  transactionId: { type: Number, unique: true },
  projectId: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
});

const expenses = mongoose.model("expenses", expenseSchema);

export default expenses;
