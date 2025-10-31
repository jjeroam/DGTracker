import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  transactionId: { type: Number, unique: true },
  projectId: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ["Income", "Expense"], required: true },
});

const expenses = mongoose.model("expenses", expenseSchema);

export default expenses;
