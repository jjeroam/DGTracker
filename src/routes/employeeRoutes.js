import express from "express";
const router = express.Router();

let employees = [
  { id: 1, name: "Juan Dela Cruz", position: "Engineer" },
  { id: 2, name: "Maria Basa", position: "Architect" },
  { id: 3, name: "Andres Bonifacio", position: "Foreman" },
  { id: 4, name: "Jose Rizal", position: "Manager" },
];

//Get all employees or limit by query
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(employees.slice(0, limit));
  }

  res.status(200).json(employees);
});

//Get employee by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((employee) => employee.id === id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.status(200).json(employee);
});

//Create new employee
router.post("/", (req, res) => {
  let newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    position: req.body.position,
  };

  if (!newEmployee.name || !newEmployee.position) {
    return res.status(400).json({ msg: "Please include name and position" });
  }

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

//Update employee by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    return res.status(404).json({ msg: `Employee ${id} not found` });
  }

  employee.name = req.body.name;
  employee.position = req.body.position;
  res.status(200).json(employee);
});

//Delete employee by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    return res.status(404).json({ msg: `Employee ${id} not found` });
  }

  employees = employees.filter((employee) => employee.id !== id);
  res.status(200).json(employees);
});

export default router;
