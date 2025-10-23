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
                <td class="tbl-contents w-10">${employee.employeeId}</td>
                <td class="tbl-contents w-25">${employee.name}</td>
                <td class="tbl-contents w-10">${employee.position}</td>
                <td class="tbl-contents w-10">${employee.salary}</td>
                <td class="tbl-contents w-auto">${employee.location}</td>  
                <td>
                  <button type="button" class="view-btn btn btn-primary tbl-contents">View</button>
                  <button type="button" class="edit-btn btn btn-success tbl-contents">Edit</button>
                  <button type="button" class="delete-btn btn btn-danger tbl-contents">Delete</button>
                </td>
            `;
      row.querySelector(".view-btn").onclick = () => viewEmployee(employee._id);
      row.querySelector(".edit-btn").onclick = () => editEmployee(employee._id);
      row.querySelector(".delete-btn").onclick = () =>
        deleteEmployee(employee._id);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching employees: ", error);
  }
}

loadEmployees();

function openEmployeeForm() {
  document.getElementById("popupForm").style.display = "flex";
}

function closeEmployeeForm() {
  document.getElementById("popupForm").style.display = none;
}

window.onclick = function (event) {
  const popup = document.getElementById("popupForm");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};

document
  .getElementById("employeeForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page refresh

    // Collect form data
    const employeeData = {
      name: document.getElementById("name").value,
      position: document.getElementById("position").value,
      salary: document.getElementById("salary").value,
    };

    try {
      const response = await fetch("http://localhost:8000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        alert("Employee added successfully!");
        document.getElementById("employeeForm").reset();
      } else {
        alert("Error adding employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

// view employee details
async function viewEmployee(id) {
  try {
    const res = await fetch(`http://localhost:8000/employees/${id}`);
    const data = await res.json();

    // Fill the popup fields with employee data
    document.getElementById("viewId").textContent = data._id;
    document.getElementById("viewName").textContent = data.name;
    document.getElementById("viewPosition").textContent = data.position;
    document.getElementById("viewSalary").textContent = data.salary;
    document.getElementById("viewEmail").textContent = data.email || "N/A";

    // Show the popup
    document.getElementById("viewEmployeePopup").style.display = "flex";
  } catch (error) {
    console.error("Error loading employee:", error);
  }
}

// Close popup
function closeViewPopup() {
  document.getElementById("viewEmployeePopup").style.display = "none";
}

// edit employee details
function editEmployee() {
  document.getElementById("editPopup").style.display = "flex";
}

function closeEditEmployeeForm() {
  document.getElementById("editPopup").style.display = none;
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    alert(`Employee with ID ${id} deleted`);
    // You can also send a DELETE request here to your backend
  }
}
