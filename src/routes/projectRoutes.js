import express from "express";
import { getProject, getProjectById, createProject, updatedProject, deleteProject } from '../controllers/projectController.js';
const router = express.Router();

router.get("/", getProject); // Get all project
router.get("/:id", getProjectById); // Get project by ID
router.post("/", createProject); // Create new project
router.put("/:id", updatedProject); // Update project by ID
router.delete("/:id", deleteProject); // Delete project by ID

export default router;
