import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getProjects,
  getDocumentsByProject,
  uploadFile,
} from "../controllers/documentController.js";
const router = express.Router();

router.post("/", (req, res, next) => {
  req.on("data", (chunk) => console.log("Incoming chunk:", chunk.toString()));
  next();
});

const storage = multer.diskStorage({
  destination: "uploads/documents/",
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/:projectId/uploads", upload.single("document"), uploadFile);
router.get("/", getProjects);
router.get("/:id", getDocumentsByProject);

export default router;
