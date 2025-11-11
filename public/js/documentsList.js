const tableBody = document.querySelector("#documentTable tbody");

async function loadDocuments() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("projectId");
    if (!projectId) {
      console.error("No project ID found in URL");
      return;
    }

    const response = await fetch(
      `http://localhost:8000/documents/${projectId}`
    );
    if (!response.ok) throw new Error("Failed to fetch documents");

    const data = await response.json();

    tableBody.innerHTML = "";

    data.forEach((doc) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="tbl-contents w-auto">${doc.name}</td>
        <td class="tbl-contents w-auto">${doc.type}</td>
        <td class="tbl-contents w-auto">${(doc.size / 1024).toFixed(2)} KB</td>
        <td class="tbl-contents w-auto">${new Date(
          doc.uploadedAt
        ).toLocaleDateString()}</td>
        <td class="tbl-contents w-auto">
          <button type="button" class="dl-btn btn btn-danger">Download</button>
        </td>
      `;
      row.querySelector(".dl-btn").onclick = () => downloadFile(doc.path);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching files:", error);
  }
}

loadDocuments();

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

document.getElementById("popupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("addFile");
  const file = fileInput.files[0];

  const form = e.target;
  const formData = new FormData();
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("projectId");
  const response = await fetch(`http://localhost:8000/documents/${projectId}`);
  if (!projectId) {
    console.error("No project ID found in URL");
    return;
  }

  formData.append("document", file);

  try {
    const response = await fetch(
      `http://localhost:8000/documents/${projectId}/uploads`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("File added successfully!");
      form.reset();
    } else {
      alert("Error adding File");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

function downloadFile(fileName) {
  const fileUrl = `http://localhost:8000/uploads/documents/${fileName}`;

  // This forces the browser to download it directly
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
