import projects from "../models/projectModel.js";
import employees from "../models/employeeModel.js";
import expenses from "../models/expenseModel.js";

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
    const newProject = await projects({
      projectId: nextId,
      name: req.body.name,
      client: req.body.client,
      status: req.body.status,
      budget: req.body.budget,
    });

    await newProject.save();

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
    const project = await projects.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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

export const connectEmployees = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find employees whose location matches this project ID
    const employeeList = await employees
      .find({ location: projectId })
      .populate("location", "name");

    if (!employeeList || employeeList.length === 0) {
      return res.status(200).json([]); // no employees assigned
    }

    res.status(200).json(employeeList);
  } catch (error) {
    console.error("Error fetching project employees:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const getProjectTransactions = async (req, res) => {
  try {
    const project = await projects.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Find the 3 most recent transactions for this project
    const transactions = await expenses
      .find({ projectId: project._id })
      .sort({ date: -1 })
      .limit(3)
      .populate("projectId", "name");

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching project transactions:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const updatedProject = updateProject;
