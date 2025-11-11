import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  projectId: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
  name: String,
  type: String,
  size: Number,
  path: String,
  uploadedAt: { type: Date, default: Date.now },
});

const documents = mongoose.model("documents", documentSchema);

export default documents;
