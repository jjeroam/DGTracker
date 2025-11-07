async function loadProjectEmployees() {
  try {
    // ✅ Get projectId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("projectId");

    if (!projectId) {
      console.error("No project ID found in URL");
      return;
    }

    // ✅ Fetch employees for that project
    const response = await fetch(
      `http://localhost:8000/payrolls/project/${projectId}/employees`
    );
    if (!response.ok) throw new Error("Failed to fetch employees");

    const employees = await response.json();

    // ✅ Display in the table
    const tableBody = document.getElementById("tableBody");
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
    console.error("Error fetching employees:", error);
  }
}

// ✅ Call automatically when the page loads
document.addEventListener("DOMContentLoaded", loadProjectEmployees);
