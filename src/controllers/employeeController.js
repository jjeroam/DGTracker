import employees from "../models/employeeModel.js";

// @dsc GET all emplyees
// @route GET /employees
export const getEmployees = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(employees.slice(0, limit));
  }

  res.status(200).json(employees);
};

// @dsc GET employee by id
// @ route GET /employees/:id
export const getEmployeeById = (req, res) => {
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
};

// @dsc POST create new employee
// @route POST /employees
export const createEmployee = (req, res) => {
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
};

// @dsc PUT employee by id
// @route PUT /employees/:id
export const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    return res.status(404).json({ msg: `Employee ${id} not found` });
  }

  employee.name = req.body.name;
  employee.position = req.body.position;
  res.status(200).json(employee);
};

// @dsc DELETE employee by id
// @route DELETE /employee/:id
export const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    return res.status(404).json({ msg: `Employee ${id} not found` });
  }

  employees = employees.filter((employee) => employee.id !== id);
  res.status(200).json(employees);
};

export const updatedEmployee = updateEmployee;
