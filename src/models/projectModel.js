import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  employeeId: { type: Number, unique: true },
  name: { type: String, require: true },
  client: { type: String, require: true },
  status: String,
  budget: Number,
});

const projects = mongoose.model("Project", projectSchema, "projects"); // 'Project' is the model name
export default projects;
