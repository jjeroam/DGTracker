import express from "express";
import { getEmployees, getEmployeeById, createEmployee, updatedEmployee, deleteEmployee } from '../controllers/employeeController.js';
const router = express.Router();

router.get("/", getEmployees); // Get all employees
router.get("/:id", getEmployeeById); // Get employee by ID
router.post("/", createEmployee); // Create new employee
router.put("/:id", updatedEmployee); // Update employee by ID
router.delete("/:id", deleteEmployee); // Delete employee by ID

export default router;
