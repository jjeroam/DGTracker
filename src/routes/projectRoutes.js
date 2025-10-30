import express from "express";
import {
  getProject,
  getProjectById,
  createProject,
  updatedProject,
  deleteProject,
  connectEmployees,
  getProjectTransactions,
} from "../controllers/projectController.js";
const router = express.Router();

router.get("/", getProject); // Get all project
router.get("/:id", getProjectById); // Get project by ID
router.post("/", createProject); // Create new project
router.put("/:id", updatedProject); // Update project by ID
router.delete("/:id", deleteProject); // Delete project by ID
router.get("/:id/employees", connectEmployees); // Get employees by project ID
router.get("/:id/transactions", getProjectTransactions); // Get transactions by project ID

export default router;
