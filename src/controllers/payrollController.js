import payrolls from "../models/payrollModel.js";
import Employee from "../models/employeeModel.js";
import projects from "../models/projectModel.js";
import puppeteer from "puppeteer";

export const getProjectsSummary = async (req, res) => {
  try {
    const project = await projects.find().populate("employees");
    const summary = project.map((p) => ({
      _id: p._id,
      name: p.name,
      employeeCount: p.employees?.length,
    }));
    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getEmployeesByProject = async (req, res) => {
  try {
    const employeesList = await Employee.find({
      location: req.params.projectId,
    });
    res.json(employeesList);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

export const generatePayrollPDF = async (req, res) => {
  const { projectId } = req.params;

  const employees = await PayrollModel.find({ projectId });

  const html = await new Promise((resolve, reject) => {
    res.render("payroll/print", { employees }, (err, htmlContent) => {
      if (err) reject(err);
      resolve(htmlContent);
    });
  });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=payroll.pdf",
  });

  res.send(pdf);
};
