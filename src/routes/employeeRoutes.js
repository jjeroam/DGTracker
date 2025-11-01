import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updatedEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import employees from "../models/employeeModel.js";
const router = express.Router();

router.get("/", getEmployees); // Get all employees
router.get("/:id", getEmployeeById); // Get employee by ID
router.post("/", createEmployee); // Create new employee
router.put("/:id", updatedEmployee); // Update employee by ID
router.delete("/:id", deleteEmployee); // Delete employee by ID

router.post("/employees", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const employee = await employees.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    console.error("Error saving employee:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
