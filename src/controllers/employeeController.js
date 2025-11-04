import employees from "../models/employeeModel.js";
import projects from "../models/projectModel.js";
import multer from "multer";

// const lastEmployee = await employees.findOne().sort({ employeeId: -1 });
// const nextId = lastEmployee ? lastEmployee.employeeId + 1 : 1;

// const newEmployee = new Employee({
//   employeeId: nextId,
//   name: req.body.name,
//   position: req.body.position
// });

// await newEmployee.save();

// @dsc GET all emplyees
// @route GET /employees

export const getEmployees = async (req, res) => {
  try {
    const allEmployees = await employees.find().populate("location", "name");
    res.status(200).json(allEmployees);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getEmployees = async (req, res) => {
//   const limit = parseInt(req.query.limit);
//   if (!isNaN(limit) && limit > 0) {
//     return res.status(200).json(employees.slice(0, limit));
//   }

//   res.status(200).json(employees);
// };

// @dsc GET employee by id
// @ route GET /employees/:id

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employees
      .findById(req.params.id)
      .populate("location", "name");
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getEmployeeById = (req, res) => {
//   let newEmployee = {
//     employeeId: employees.length + 1,
//     name: req.body.name,
//     position: req.body.position,
//     location: req.body.location,
//     salary: req.body.salary,
//   };

//   if (!newEmployee.name || !newEmployee.position) {
//     return res.status(400).json({ msg: "Please include name and position" });
//   }

//   employees.push(newEmployee);
//   res.status(201).json(newEmployee);
// };

// @dsc POST create new employee
// @route POST /employees

export const createEmployee = async (req, res) => {
  try {
    // Find the last employee by employeeId in descending order
    const lastEmployee = await employees.findOne().sort({ employeeId: -1 });

    // If there’s one, add +1; otherwise start at 1
    const nextId = lastEmployee ? lastEmployee.employeeId + 1 : 1;

    const project = await projects.findOne({ name: req.body.name });

    const filePaths = [
      req.files.resume?.[0]?.path,
      req.files.birthCert?.[0]?.path,
      req.files.policeClear?.[0]?.path,
    ].filter(Boolean); // removes undefined

    // Create a new employee using the next ID
    const newEmployee = await employees.create({
      employeeId: nextId,
      name: req.body.name,
      address: req.body.address,
      civilStatus: req.body.civilStatus,
      sex: req.body.sex,
      birthday: req.body.birthday,
      contactNum: req.body.contactNum,
      position: req.body.position,
      salaryRate: req.body.salaryRate,
      sssNum: req.body.sssNum,
      tinNum: req.body.tinNum,
      pagibigNum: req.body.pagibigNum,
      philHealthNum: req.body.philHealthNum,
      documents: filePaths,
    });

    res.status(200).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ msg: error.message });
  }
};

// export const createEmployee = (req, res) => {
//   let newEmployee = {
//     employeeID: nextId,
//     name: req.body.name,
//     position: req.body.position,
//     location: req.body.location,
//     salary: req.body.salary,
//   };

//   if (
//     !newEmployee.name ||
//     !newEmployee.position ||
//     !newEmployee.locaiton ||
//     !newEmployee.salary
//   ) {
//     return res
//       .status(400)
//       .json({ msg: "Error: please make sure you fill up all the spaces." });
//   }

//   employees.push(newEmployee);
//   res.status(201).json(newEmployee);
// };

// @dsc PUT employee by id
// @route PUT /employees/:id

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!employee) {
      return res.status(404).json({ msg: `Employee ${id} not found` });
    }

    const updatedEmployee = await employees.findById(id);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatedEmployee = updateEmployee;
// export const updateEmployee = (req, res) => {
//   const id = parseInt(req.params.id);
//   const employee = employees.find((employee) => employee.id === id);

//   if (!employee) {
//     return res.status(404).json({ msg: `Employee ${id} not found` });
//   }

//   employee.name = req.body.name;
//   employee.position = req.body.position;
//   res.status(200).json(employee);
// };

// @dsc DELETE employee by id
// @route DELETE /employee/:id

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employees.findByIdAndDelete(id);
    if (!employee) {
      res.status(404).json({ msg: `Employee ${id} not found` });
    }
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const deleteEmployee = (req, res) => {
//   const id = parseInt(req.params.id);
//   const employee = employees.find((employee) => employee.id === id);

//   if (!employee) {
//     return res.status(404).json({ msg: `Employee ${id} not found` });
//   }

//   employees = employees.filter((employee) => employee.id !== id);
//   res.status(200).json(employees);
// };

export const assignProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId } = req.body;

    // Update the employee's location with the selected project
    const employee = await employees
      .findByIdAndUpdate(
        id,
        { $addToSet: { location: projectId } }, // prevents duplicates
        { new: true }
      )
      .populate("location", "name");

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json({ msg: "Project assigned successfully", employee });
  } catch (error) {
    console.error("Error assigning project:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
