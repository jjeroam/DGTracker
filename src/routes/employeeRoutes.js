import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updatedEmployee,
  deleteEmployee,
  assignProject,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", (req, res, next) => {
  req.on("data", (chunk) => console.log("Incoming chunk:", chunk.toString()));
  next();
});

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create a folder for the specific employee (based on name or ID)
    const employeeName = req.body.name?.replace(/\s+/g, "_") || "unknown";
    const uploadDir = path.join("uploads", employeeName);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    // Rename automatically based on field name
    let newFileName;

    switch (file.fieldname) {
      case "resume":
        newFileName = "resume" + path.extname(file.originalname);
        break;
      case "birthCert":
        newFileName = "birthCert" + path.extname(file.originalname);
        break;
      case "policeClear":
        newFileName = "policeClear" + path.extname(file.originalname);
        break;
      default:
        newFileName = file.originalname; // fallback
        break;
    }

    cb(null, newFileName);
  },
});

const upload = multer({ storage });

// Expecting specific field names

router.post(
  "/",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "birthCert", maxCount: 1 },
    { name: "policeClear", maxCount: 1 },
  ]),
  createEmployee
);

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updatedEmployee);
router.delete("/:id", deleteEmployee);
router.put("/:id/assign-project", assignProject);

export default router;
