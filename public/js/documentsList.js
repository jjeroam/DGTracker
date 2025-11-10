const tableBody = document.querySelector("documentTable tbody");

async function loadDocuments() {
  try {
    const response = await fetch("http://localhost:8000/documents");
    if (!response.ok) throw new Error("Failed to fetch documents");
    const data = await response.json();

    tableBody.innerHTML = "";

    data.forEach((documents) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td class="tbl-contents w-auto">${documents.name}</td>
                <td> <button type="button" class="dl-btn btn btn-danger">Download</button> </td>
            `;
      row.querySelector(".dl-btn").onclick = () => downloadFile(documents._id);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching Files: ", error);
  }
}

function openUploadForm() {
  document.getElementById("popupForm").style.display = "flex";
}

window.onclick = function (event) {
  const popup = document.getElementById("popupForm");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};

function closePopup() {
  document.getElementById("popupForm").style.display = "none";
}

function downloadFile() {
  alert("download button clicked!");
}
