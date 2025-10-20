import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  employeeId: { type: Number, unique: true},
  name: String,
  client: String,
  status: String,
  budget: Number,
});

const projects = mongoose.model("Project", projectSchema, "projects"); // 'Project' is the model name
export default projects;
