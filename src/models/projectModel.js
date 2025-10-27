import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectId: { type: Number, unique: true },
  name: { type: String, require: true },
  client: { type: String, require: true },
  status: { type: String },
  budget: { type: Number },
  location: String,
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "employees" }],
});

const projects = mongoose.model("projects", projectSchema, "projects"); // 'Project' is the model name
export default projects;
  