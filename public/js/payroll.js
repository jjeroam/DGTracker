const button = document.getElementById("loadProjectEmployees");
const tableBody = document.querySelector("#employeeTable tbody");

async function loadPayrollProjects() {
  try {
    const response = await fetch("http://localhost:8000/projects");
    const projects = await response.json();

    const container = document.getElementById("payrollCardsContainer");
    container.innerHTML = ""; // Clear previous cards

    projects.forEach((project) => {
      const employeeCount = project.employees ? project.employees.length : 0;

      const card = document.createElement("div");
      card.classList.add("col-md-5", "mb-2");
      card.innerHTML = `
        <div class="card text-center p-3">
          <h5 class="fw-bold text-success mb-2">${project.name}</h5>
          <p class="text-muted mb-2 small">${employeeCount} employee${
        employeeCount !== 1 ? "s" : ""
      }</p>
      <a href="createPayroll.html?projectId=${
        project._id
      }" onclick="loadProjectEmployees()" class="btn btn-outline-success btn-sm"> Create Payroll </a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

async function loadProjectEmployees(id) {
  try {
    const response = await fetch(
      `http://localhost:8000/payrolls/project/${id}/employees`
    );
    if (!response.ok) throw new Error("Failed to fetch employees");
    const employees = await response.json();

    tableBody.innerHTML = "";
    
    employees.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td class="tbl-contents w-25">${employee.name}</td>
                <td class="tbl-contents w-10">${employee.position}</td>
                <td class="tbl-contents w-10">${employee.salaryRate}</td>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching employees: ", error);
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", loadPayrollProjects);
