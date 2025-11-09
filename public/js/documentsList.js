const tableBody = document.querySelector("documentTable tbody");

async function loadDocuments() {
    try {
        const response = await fetch ("http://localhost:8000/documents");
        if (!response.ok) throw new Error("Failed to fetch documents");
        const data = await response.json();

        tableBody.innerHTML = "";

        data.forEach((documents) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="tbl-contents w-auto">${documents.name}</td>
            `;
        });
    } catch (error) {
        
    }
}