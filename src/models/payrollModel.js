import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "employees" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
  salaryRate: [{ type: mongoose.Schema.Types.ObjectId, ref: "employees" }],
  timeByHour: {
    sun: Number,
    mon: Number,
    tue: Number,
    wed: Number,
    thu: Number,
    fri: Number,
    sat: Number,
  },
  cashAdvance: Number,
  cashAdvanceBalance: Number,
});

const payrolls = mongoose.model("payrolls", payrollSchema);

export default payrolls;
