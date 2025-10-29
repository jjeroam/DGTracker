const button = document.getElementById("loadTransaction");
const tableBody = document.querySelector("#expenseTable tbody");

async function loadExpenses() {
  try {
    const response = await fetch("http://localhost:8000/finances");
    if (!response.ok) throw new Error("Failed to fetch expenses");
    const data = await response.json();

    tableBody.innerHTML = "";

    data.forEach((transaction) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td class="tbl-contents w-10">${transaction.transactionId}</td>
                <td class="tbl-contents w-25">${transaction.projectId}</td>
                <td class="tbl-contents w-10">${transaction.amount}</td>
                <td class="tbl-contents w-10">${transaction.category}</td>
                <td>
                  <button type="button" class="view-btn btn btn-primary tbl-contents">View</button>
                  <button type="button" class="edit-btn btn btn-success tbl-contents">Edit</button>
                  <button type="button" class="delete-btn btn btn-danger tbl-contents">Delete</button>
                </td>
            `;
      row.querySelector(".view-btn").onclick = () =>
        viewTransaction(transaction._id);
      row.querySelector(".edit-btn").onclick = () =>
        editTransaction(transaction._id);
      row.querySelector(".delete-btn").onclick = () =>
        deleteTransaction(transaction._id);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching Transactions: ", error);
  }
}

loadExpenses();

function openTransactionForm() {
  document.getElementById("addTransactionPopup").style.display = "flex";
}

window.onclick = function (event) {
  const popup = document.getElementById("addTransactionPopup");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};

document
  .getElementById("transactionForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const transactionData = {
      projectId: document.getElementById("addTransactionName").value,
      amount: document.getElementById("addAmount").value,
      category: document.getElementById("addCategory").value,
    };

    try {
      const response = await fetch("http://localhost:8000/finances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        alert("Transaction added successfully!");
        document.getElementById("transactionForm").reset();
      } else {
        alert("Error adding transaction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

async function viewTransaction(id) {
  try {
    const res = await fetch(`http://localhost:8000/finances/${id}`);
    const data = await res.json();

    document.getElementById("viewTransactionName").textContent = data.projectId;
    document.getElementById("viewAmount").textContent = data.amount;
    document.getElementById("viewCategory").textContent = data.category;
    document.getElementById("viewDate").textContent = data.date;

    document.getElementById("viewTransactionPopup").style.display = "flex";
  } catch (error) {
    console.error("Error loading transaction:", error);
  }
}

let currentTransactionId = null;

async function editTransaction(id) {
  currentTransactionId = id;

  try {
    const response = await fetch(`http://localhost:8000/finances/${id}`);
    const transaction = await response.json();

    document.getElementById("editTransactionName").value = transaction.projectId;
    document.getElementById("editAmount").value = transaction.amount;
    document.getElementById("editCategory").value = transaction.category;
    document.getElementById("editDate").value = transaction.date;

    document.getElementById("editTransactionPopup").style.display = "flex";
  } catch (error) {
    console.error("Error loading transaction:", error);
  }
}

async function updateTransaction(event, id) {
  event.preventDefault();

  const transactionName = document.getElementById("editTransactionName").value;
  const amount = document.getElementById("editAmount").value;
  const category = document.getElementById("editCategory").value;
  const date = document.getElementById("editDate").value;

  try {
    const response = await fetch(`http://localhost:8000/finances/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionName, amount, category, date }),
    });

    if (response.ok) {
      alert("Transaction updated successfully!");
      document.getElementById("editTransactionPopup").style.display = "none";
    } else {
      alert("Failed to update transaction.");
    }
  } catch (error) {
    console.error("Error updating Transaction:", error);
  }
}

async function deleteTransaction(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    try {
      const response = await fetch(`http://localhost:8000/finances/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Transaction deleted successfully!");
        // Reload or refresh table data
        loadExpenses();
      } else {
        alert("Failed to delete transaction.");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }
}

// Close popup
function closePopup() {
  document.getElementById("viewTransactionPopup").style.display = "none";
  document.getElementById("editTransactionPopup").style.display = "none";
  document.getElementById("addTransactionPopup").style.display = "none";
}
