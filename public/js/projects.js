// import bootstrap from "bootstrap";

const button = document.getElementById("loadProjects");
const tableBody = document.querySelector("#projectTable tbody");

async function loadProjects() {
  try {
    const response = await fetch("http://localhost:8000/projects");
    if (!response.ok) throw new Error("Failed to fetch projects");
    const data = await response.json();

    tableBody.innerHTML = "";

    data.forEach((project) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <!--<td class="tbl-contents w-10">${project.projectId}</td>-->
                <td class="tbl-contents w-25">${project.name}</td>
                <td class="tbl-contents w-10">${project.client}</td>
                <td class="tbl-contents w-10">${project.status}</td>
                <td class="tbl-contents w-auto">₱${project.budget.toLocaleString()}</td> 
                <td class="tbl-contents w-auto">₱${project.remainingBudget.toLocaleString()}</td>  
                <td>
                  <button type="button" class="view-btn btn btn-primary tbl-contents">View</button>
                  <button type="button" class="delete-btn btn btn-danger tbl-contents">Delete</button>
                  <button type="button" class="edit-btn btn btn-success tbl-contents">Edit</button>
                </td>
            `;
      row.querySelector(".view-btn").onclick = () => viewProject(project._id);
      row.querySelector(".edit-btn").onclick = () => editProject(project._id);
      row.querySelector(".delete-btn").onclick = () =>
        deleteProject(project._id);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching projects: ", error);
  }
}

loadProjects();

function openProjectForm() {
  document.getElementById("popupForm").style.display = "flex";
}

window.onclick = function (event) {
  const popup = document.getElementById("popupForm");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};

document.getElementById("projectForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page refresh

  // Collect form data
  const projectData = {
    name: document.getElementById("name").value,
    client: document.getElementById("client").value,
    status: document.getElementById("status").value,
    budget: document.getElementById("budget").value,
    startDate: document.getElementById("startDate").value,
    dueDate: document.getElementById("dueDate").value,
  };

  try {
    const response = await fetch("http://localhost:8000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      alert("Project added successfully!");
      document.getElementById("projectForm").reset();
    } else {
      alert("Error adding project");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// view project details
async function viewProject(id) {
  try {
    const res = await fetch(`http://localhost:8000/projects/${id}`);
    const data = await res.json();
    // Fill the popup fields with project data
    // document.getElementById("viewId").textContent = data._id;
    document.getElementById("viewName").textContent = data.name;
    document.getElementById("viewClient").textContent = data.client;
    document.getElementById("viewStatus").textContent = data.status;
    document.getElementById("viewBudget").textContent = data.remainingBudget
      ? `₱${Number(data.budget).toLocaleString()}`
      : "N/A";
    document.getElementById("viewRemainingBudget").textContent =
      data.remainingBudget
        ? `₱${Number(data.remainingBudget).toLocaleString()}`
        : "N/A";
    document.getElementById("viewStartDate").textContent =
      data.startDate.split("T")[0];
    document.getElementById("viewDueDate").textContent =
      data.dueDate.split("T")[0];

    const empRes = await fetch(
      `http://localhost:8000/projects/${id}/employees`
    );
    const employees = await empRes.json();

    const empList = document.getElementById("viewEmployeesList");
    empList.innerHTML = "";

    if (employees.length === 0) {
      empList.innerHTML = "<p>No employees assigned to this project.</p>";
    } else {
      employees.forEach((emp) => {
        const li = document.createElement("li");
        li.textContent = `${emp.name} - ${emp.position}`;
        empList.appendChild(li);
      });
    }

    const transRes = await fetch(
      `http://localhost:8000/projects/${id}/transactions`
    );
    const transactions = await transRes.json();

    const transContainer = document.getElementById("viewTransactions");
    transContainer.innerHTML = "";

    if (transactions.length === 0) {
      transContainer.innerHTML = "<p>No recent transactions.</p>";
    } else {
      transactions.forEach((t) => {
        const item = document.createElement("p");
        item.textContent = `${t.category} - ₱${t.amount} on ${new Date(
          t.date
        ).toLocaleDateString()}`;
        transContainer.appendChild(item);
      });
    }

    // Show the popup
    document.getElementById("viewProjectPopup").style.display = "flex";
  } catch (error) {
    console.error("Error loading project:", error);
  }
}

// edit project details
let currentProjectId = null;

async function editProject(id) {
  currentProjectId = id;

  try {
    const response = await fetch(`http://localhost:8000/projects/${id}`);
    const project = await response.json();

    document.getElementById("editName").value = project.name;
    document.getElementById("editClient").value = project.client;
    document.getElementById("editStatus").value = project.status;

    document.getElementById("editPopup").style.display = "flex";
  } catch (error) {
    console.error("Error loading project:", error);
  }
}
async function updateProject(event, id) {
  event.preventDefault();

  const name = document.getElementById("editName").value;
  const client = document.getElementById("editClient").value;
  const status = document.getElementById("editStatus").value;

  try {
    const response = await fetch(`http://localhost:8000/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, client, status }),
    });

    if (response.ok) {
      alert("Project updated successfully!");
      document.getElementById("editPopup").style.display = "none";
    } else {
      alert("Failed to update project.");
    }
  } catch (error) {
    console.error("Error updating project:", error);
  }
}

function closeForm() {
  document.getElementById("editPopup").style.display = "none";
  document.getElementById("viewProjectPopup").style.display = "none";
  document.getElementById("popupForm").style.display = "none";
}

async function deleteProject(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    try {
      const response = await fetch(`http://localhost:8000/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Project deleted successfully!");
        // Reload or refresh table data
        loadProjects();
      } else {
        alert("Failed to delete project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }
}
