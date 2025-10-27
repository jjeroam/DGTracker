import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: { type: Number, unique: true },
  name: String,
  position: String,
  salary: Number,
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
});

const employees = mongoose.model("employees", employeeSchema, "employees"); // 'Employee' is the model name
export default employees;
