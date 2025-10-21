import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors"
import employee from "./src/routes/employeeRoutes.js";
import finances from "./src/routes/financeRoutes.js";
import projects from "./src/routes/projectRoutes.js";
import documents from "./src/routes/documentRoutes.js";
import connectDB from "./src/config/db.js";
import { fileURLToPath } from 'url'
import axios from "axios";

const PORT = process.env.PORT;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

app.use("/employees", employee);
app.use("/finances", finances);
app.use("/projects", projects);
app.use("/documents", documents);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
