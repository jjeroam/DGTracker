const button = document.getElementById("loadProjectEmployees");
const tableBody = document.querySelector("#employeeTable tbody");

async function loadPayrollProjects() {
  try {
    const response = await fetch("http://localhost:8000/projects");
    const projects = await response.json();

    const container = document.getElementById("documentCardsContainer");
    container.innerHTML = ""; // Clear previous cards

    projects.forEach((project) => {
      const card = document.createElement("div");
      card.classList.add("col-md-3", "mb-5");
      card.innerHTML = `
        <div class="card text-center p-3">
          <h5 class="fw-bold text-success mb-2">${project.name}</h5>
      <a href="documentsList.html?projectId=${project._id}" onclick="loadProjectDocuments()" class="btn btn-outline-success btn-sm"> View Documents </a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}
// Call the function when the page loads
document.addEventListener("DOMContentLoaded", loadPayrollProjects);
