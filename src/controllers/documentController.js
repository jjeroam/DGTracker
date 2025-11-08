import projects from "../models/projectModel.js";
import documents from "../models/documentModel.js";

export const getProjects = async (req, res) => {
    try {
        const project = await projects.find();

        res.json(project);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
    }
};
export const getDocumentsByProject = async (req, res) => {
  try {
    const documentsList = await documents.find({
      file: req.params.file,
    });
    res.json(documentsList);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
