import express from "express";
import path from "path";
import employees from "./src/routes/employeeRoutes.js";
import finances from "./src/routes/financeRoutes.js";
import projects from "./src/routes/projectRoutes.js";
import documents from "./src/routes/documentRoutes.js";
const PORT = process.env.PORT;
const app = express();

// app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/employees", employees);
app.use("/finances", finances);
app.use("/projects", projects);
app.use("/documents", documents);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
