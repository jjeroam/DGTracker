import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  location: String,
  salary: Number,
});

const employees = mongoose.model("Employee", employeeSchema, "employees_list"); // 'Employee' is the model name
export default employees;
