import mongoose from "mongoonse";

const documentSchema = new mongoose.Schema({
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
    file: [string],
})

const documents = mongoose.model("documents", documentSchema);

export default documents;