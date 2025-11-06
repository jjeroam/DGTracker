import express from "express";
import {
  getEmployeesByProject,
  getProjectsSummary,
} from "../controllers/payrollController.js";

const router = express.Router();

router.get("/projects", getProjectsSummary);
router.get("/project/:projectId/employees", getEmployeesByProject);

export default router;
