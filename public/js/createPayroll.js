async function loadProjectEmployees() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("projectId");

    if (!projectId) {
      console.error("No project ID found in URL");
      return;
    }

    const response = await fetch(
      `http://localhost:8000/payrolls/project/${projectId}/employees`
    );
    if (!response.ok) throw new Error("Failed to fetch employees");

    const employees = await response.json();

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    employees.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="tbl-contents w-25">${employee.name}</td>
        <td class="tbl-contents w-10">${employee.position}</td>
        <td class="tbl-contents w-10">${employee.salaryRate}</td>
        <td class="tbl-contents w-10"><select id="sun">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option></select></td>
        <td class="tbl-contents w-10"><select id="mon">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option></select></td>
        <td class="tbl-contents w-10"><select id="tue">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option></select></td>
        <td class="tbl-contents w-10"><select id="wed">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option></select></td>
        <td class="tbl-contents w-10"><select id="thu">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option></select></td>
        <td class="tbl-contents w-10"><select id="fri">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option></select></td>
        <td class="tbl-contents w-10"><select id="sat">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option></select></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

async function totalHours(){

}

document.addEventListener("DOMContentLoaded", loadProjectEmployees);
