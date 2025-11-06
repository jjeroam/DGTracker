import payrolls from "../models/payrollModel.js";
import Employee from "../models/employeeModel.js";
import projects from "../models/projectModel.js";

export const getProjectsSummary = async (req, res) => {
  try {
    const project = await projects.find().populate("employees");
    const summary = project.map((p) => ({
      _id: p._id,
      name: p.name,
      employeeCount: p.employees?.length
    }));
    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getEmployeesByProject = async (req, res) => {
  try {
    const employeesList = await Employee.find({
      location: req.params.projectId,
    });
    const names = employeesList.map((emp) => emp.name);
    res.json(names);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
