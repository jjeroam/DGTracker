import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updatedEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder for uploads (make sure it exists)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

router.get("/download/:filename", (req, res) => {
  const filePath = path.join(process.cwd(), "uploads", req.params.filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath); // prompts download
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

const upload = multer({ storage });

router.get("/", getEmployees); // Get all employees
router.get("/:id", getEmployeeById); // Get employee by ID
router.post("/", upload.array("documents", 5), createEmployee); // Create new employee
router.put("/:id", updatedEmployee); // Update employee by ID
router.delete("/:id", deleteEmployee); // Delete employee by ID

export default router;
