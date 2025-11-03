import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: { type: Number, unique: true },
  name: String,
  address: String,
  civilStatus: {
    type: String,
    enum: ["Single", "Married", "Widowed"],
  },
  sex: { type: String, enum: ["Male", "Female"] },
  birthday: Date,
  contactNum: {
    type: String,
    match: [
      /^(?:\+639|09)\d{9}$/,
      "Please enter a valid Philippine mobile number",
    ],
  },
  position: String,
  salaryRate: Number,
  sssNum: Number,
  tinNum: Number,
  pagibigNum: Number,
  philHealthNum: Number,
  location: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
  documents: [String],
});

const employees = mongoose.model("employees", employeeSchema, "employees"); // 'Employee' is the model name
export default employees;
