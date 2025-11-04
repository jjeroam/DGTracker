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
                <td class="tbl-contents w-10">${employee.salaryRate}</td>
                <td class="tbl-contents w-auto">${employee.location?.[0]?.name}</td>
                <td>
                  <button type="button" class="view-btn btn btn-primary tbl-contents">View</button>
                  <button type="button" class="edit-btn btn btn-success tbl-contents">Edit</button>
                  <button type="button" class="assign-btn btn btn-secondary tbl-contents">Assign</button>
                  <button type="button" class="delete-btn btn btn-danger tbl-contents">Delete</button>
                </td>
            `;
      row.querySelector(".view-btn").onclick = () => viewEmployee(employee._id);
      row.querySelector(".edit-btn").onclick = () => editEmployee(employee._id);
      row.querySelector(".assign-btn").onclick = () =>
        assignEmployee(employee._id);
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

window.onclick = function (event) {
  const popup = document.getElementById("popupForm");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};

document
  .getElementById("employeeForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    // Append text fields manually
    formData.append("name", document.getElementById("addName").value);
    formData.append("address", document.getElementById("addAddress").value);
    formData.append(
      "civilStatus",
      document.getElementById("addCivilStatus").value
    );
    formData.append(
      "sex",
      document.querySelector('input[name="addSex"]:checked').value
    );
    formData.append("birthday", document.getElementById("addBirthday").value);
    formData.append(
      "contactNum",
      document.getElementById("addContactNum").value
    );
    formData.append("position", document.getElementById("addPosition").value);
    formData.append(
      "salaryRate",
      document.getElementById("addSalaryRate").value
    );
    formData.append("sssNum", document.getElementById("addSSSNum").value);
    formData.append("tinNum", document.getElementById("addTinNum").value);
    formData.append(
      "pagibigNum",
      document.getElementById("addPagibigNum").value
    );
    formData.append(
      "philHealthNum",
      document.getElementById("addPhilHealthNum").value
    );

    formData.append("resume", document.getElementById("addResume").files[0]);
    formData.append(
      "birthCert",
      document.getElementById("addBirthCert").files[0]
    );
    formData.append(
      "policeClear",
      document.getElementById("addPoliceClear").files[0]
    );

    try {
      const response = await fetch("http://localhost:8000/employees", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Employee added successfully!");
        form.reset();
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
    // document.getElementById("viewId").textContent = data._id;
    document.getElementById("viewName").textContent = data.name;
    document.getElementById("viewAddress").textContent = data.address;
    document.getElementById("viewCivilStatus").textContent = data.civilStatus;
    document.querySelector(
      `input[name="editSex"][value="${data.sex}"]`
    ).checked = true;
    document.getElementById("viewBirthday").textContent =
      data.birthday.split("T")[0];
    document.getElementById("viewContactNum").textContent = data.contactNum;
    document.getElementById("viewPosition").textContent = data.position;
    document.getElementById("viewSalaryRate").textContent = data.salaryRate;
    document.getElementById("viewSSSNum").textContent = data.sssNum || "N/A";
    document.getElementById("viewTinNum").textContent = data.tinNum || "N/A";
    document.getElementById("viewPagibigNum").textContent =
      data.pagibigNum || "N/A";
    document.getElementById("viewPhilHealthNum").textContent =
      data.philHealthNum || "N/A";
    document.getElementById("viewLocation").textContent =
      data.location?.[0]?.name;

    // Show the popup
    document.getElementById("viewEmployeePopup").style.display = "flex";
  } catch (error) {
    console.error("Error loading employee:", error);
  }
}

// edit employee details
let currentEmployeeId = null;

async function editEmployee(id) {
  currentEmployeeId = id;

  loadProjects("editLocation");
  try {
    const response = await fetch(`http://localhost:8000/employees/${id}`);
    const employee = await response.json();

    document.getElementById("editName").value = employee.name;
    document.getElementById("viewAddress").value = employee.address;
    document.getElementById("viewCivilStatus").value = employee.civilStatus;
    document.getElementById("viewSex").value = employee.sex;
    document.getElementById("viewBirthday").value =
      employee.birthday.split("T")[0];
    document.getElementById("viewContactNum").value = employee.contactNum;
    document.getElementById("viewPosition").value = employee.position;
    document.getElementById("viewSalaryRate").value = employee.salaryRate;
    document.getElementById("viewSSSNum").value = employee.sssNum || "N/A";
    document.getElementById("viewTinNum").value = employee.tinNum || "N/A";
    document.getElementById("viewPagibigNum").value =
      employee.pagibigNum || "N/A";
    document.getElementById("viewPhilHealthNum").value =
      employee.philHealthNum || "N/A";

    document.getElementById("editPopup").style.display = "flex";
  } catch (error) {
    console.error("Error loading employee:", error);
  }
}

async function updateEmployee(event, id) {
  event.preventDefault();

  const name = document.getElementById("editName").value;
  const position = document.getElementById("editPosition").value;
  const salary = document.getElementById("editSalary").value;

  try {
    const response = await fetch(`http://localhost:8000/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, position, salary }),
    });

    if (response.ok) {
      alert("Employee updated successfully!");
      document.getElementById("editPopup").style.display = "none";
    } else {
      alert("Failed to update employee.");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
  }
}

async function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    try {
      const response = await fetch(`http://localhost:8000/employees/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Employee deleted successfully!");
        // Reload or refresh table data
        loadEmployees();
      } else {
        alert("Failed to delete employee.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }
}

function assignEmployee(id) {
  document.getElementById("assignEmployeeId").value = id;
  loadProjects("assignLocation");
  document.getElementById("assignPopup").style.display = "flex";
}
document
  .getElementById("assignEmployeeForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById("assignEmployeeId").value;
    const projectId = document.getElementById("assignLocation").value;

    try {
      const response = await fetch(
        `http://localhost:8000/employees/${employeeId}/assign-project`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId }),
        }
      );

      if (response.ok) {
        alert("Employee assigned successfully!");
        closePopup();
      } else {
        alert("Failed to assign employee.");
      }
    } catch (error) {
      console.error("Error assigning project:", error);
    }
  });

// Close popup
function closePopup() {
  document.getElementById("viewEmployeePopup").style.display = "none";
  document.getElementById("editPopup").style.display = "none";
  document.getElementById("popupForm").style.display = "none";
  document.getElementById("assignPopup").style.display = "none";
}

async function loadProjects(selectId) {
  try {
    const response = await fetch("http://localhost:8000/projects");
    const projects = await response.json();

    const select = document.getElementById(selectId);

    select.innerHTML = "<option value=''>Select Project</option>";

    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project._id; // store ObjectId
      option.textContent = project.name; // show readable name
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

function nextStep(step) {
  document
    .querySelectorAll(".form-step")
    .forEach((div) => div.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");
}

function prevStep(step) {
  document
    .querySelectorAll(".form-step")
    .forEach((div) => div.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");
}

function downloadFile(filename) {
  const fileUrl = `http://localhost:8000/uploads/${filename}`;

  // This forces the browser to download it directly
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

window.addEventListener("DOMContentLoaded", loadProjects);
