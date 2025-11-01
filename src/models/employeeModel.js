import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: { type: Number, unique: true },
  name: String,
  address: String,
  civilStatus: {
    type: String,
    enum: ["Single", "Married", "Widowed"],
    required: true,
  },
  sex: { type: String, enum: ["Male", "Female"], required: true },
  birthday: Date,
  contactNum: {
    type: String,
    required: true,
    match: [
      /^(?:\+639|09)\d{9}$/,
      "Please enter a valid Philippine mobile number",
    ],
  },
  
  position: String,
  salary: Number,
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
});

const employees = mongoose.model("employees", employeeSchema, "employees"); // 'Employee' is the model name
export default employees;
