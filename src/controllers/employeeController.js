import employee from "../models/employeeModel.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const emp = await employee.findById(req.params.id);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(emp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatedEmployee = updateEmployee;
