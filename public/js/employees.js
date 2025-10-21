// import bootstrap from "bootstrap";

const button = document.getElementById("loadEmployees");
const tableBody = document.querySelector("#employeeTable tbody");

async function loadEmployees() {
  try {
    const response = await fetch("http://localhost:8000/employees");
    if (!response.ok) throw new Error("Failed to fetch employees");
    const data = await response.json();

    tableBody.innerHTML = "";

    data.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td class="tbl-contents">${employee.employeeId}</td>
                <td class="tbl-contents">${employee.name}</td>
                <td class="tbl-contents">${employee.position}</td>
                <td class="tbl-contents">${employee.salary}</td>
                <td class="tbl-contents">${employee.location}</td>
                <button type="button" class="edit-btn btn btn-success tbl-contents">Edit</button>
                <button type="button" class="delete-btn btn btn-danger tbl-contents">Delete</button>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching employees: ", error);
  }
}

loadEmployees();
