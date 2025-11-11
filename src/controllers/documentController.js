import projects from "../models/projectModel.js";
import documents from "../models/documentModel.js";

export const getProjects = async (req, res) => {
  try {
    const project = await projects.find();
    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getDocumentsByProject = async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const files = await documents.find({ projectId }).sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files", error: err.message });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newDocuments = new documents({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      projectId: projectId,
    });

    await newDocuments.save();
    res.status(200).json({ message: "File uploaded successfully", newDocuments });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ msg: error.message });
  }
};
