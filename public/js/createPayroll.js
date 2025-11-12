async function loadProjectEmployees() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("projectId");
    if (!projectId) return;

    const response = await fetch(
      `http://localhost:8000/payrolls/project/${projectId}/employees`
    );
    const employees = await response.json();

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    employees.forEach((employee, index) => {
      const row = document.createElement("tr");

      // Use classes instead of IDs for daily selects
      row.innerHTML = `
        <td class="tbl-contents w-auto">${employee.name}</td>
        <td class="tbl-contents w-auto">${employee.position}</td>
        <td class="tbl-contents w-auto rate">${employee.salaryRate}</td>
        <td class="tbl-contents w-auto"><select class="day sun"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td>
        <td class="tbl-contents w-auto"><select class="day mon"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td>
        <td class="tbl-contents w-auto"><select class="day tue"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td>
        <td class="tbl-contents w-auto"><select class="day wed"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td>
        <td class="tbl-contents w-auto"><select class="day thu"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td>
        <td class="tbl-contents w-auto"><select class="day fri"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td>
        <td class="tbl-contents w-auto"><select class="day sat"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td>
        <td class="tbl-contents w-auto total">0</td>
        <td class="tbl-contents w-auto netTotal">0</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      `;
      tableBody.appendChild(row);

      // Add event listeners to all selects in this row
      const selects = row.querySelectorAll("select.day");
      const totalCell = row.querySelector(".total");
      const netTotal = row.querySelector(".netTotal");
      const rateCell = row.querySelector(".rate");

      const rate = parseFloat(rateCell.textContent);
      console.log(rate);

      selects.forEach((select) => {
        select.addEventListener("input", () => {
          let sum = 0;
          selects.forEach((s) => (sum += parseFloat(s.value) || 0));
          totalCell.textContent = sum;
          netTotal.textContent = sum * rate;
        });
      });
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProjectEmployees);
