import projects from "../models/projectModel.js";

// @dsc GET all projects
// @route GET /projects

export const getProject = async (req, res) => {
  try {
    const allProjects = await projects.find({});
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @dsc GET project by id
// @ route GET /projects/:id

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projects.findById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @dsc POST create new project
// @route POST /projects

export const createProject = async (req, res) => {
  try {
    // Find the last project by projectId in descending order
    const lastProject = await projects.findOne().sort({ projectId: -1 });

    // If there’s one, add +1; otherwise start at 1
    const nextId = lastProject ? lastProject.projectId + 1 : 1;

    // Create a new project using the next ID
    const newProject = await projects.create({
      projectId: nextId,
      name: req.body.name,
      client: req.body.client,
      status: req.body.status,
      budget: req.body.budget,
    });

    res.status(200).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ msg: error.message });
  }
};

// @dsc PUT project by id
// @route PUT /projects/:id

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projects.findByIdAndUpdate(id, req.body);
    if (!project) {
      return res.status(404).json({ msg: `Project ${id} not found` });
    }

    const updatedProject = await projects.findById(id);
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @dsc DELETE project by id
// @route DELETE /projects/:id

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projects.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({ msg: `Project ${id} not found` });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatedProject = updateProject;
