import express from "express";
import {
  getEmployeesByProject,
  getProjectsSummary,
  generatePayrollPDF,
} from "../controllers/payrollController.js";

const router = express.Router();

router.get("/projects", getProjectsSummary);
router.get("/project/:projectId/employees", getEmployeesByProject);
router.get("/:projectId/payroll/pdf", generatePayrollPDF);

export default router;
