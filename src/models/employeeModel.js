import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: { type: Number, unique: true },
  name: String,
  position: String,
  salary: Number,
  location: String,
});

const employees = mongoose.model("Employee", employeeSchema, "employees"); // 'Employee' is the model name
export default employees;
