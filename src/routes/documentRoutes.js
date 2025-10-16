import express from "express";
const router = express.Router();

// Sample data for finances
let documents = [
  {
    id: 1,
    name: "Blueprint A",
    type: "Blueprint",
    description: "Blueprint for Project Alpha",
  },
  {
    id: 2,
    name: "Contract B",
    type: "Contract",
    description: "Contract for Project Beta",
  },
  {
    id: 3,
    name: "Invoice C",
    type: "Invoice",
    description: "Invoice for Project Gamma",
  },
  {
    id: 4,
    name: "Report D",
    type: "Report",
    description: "Progress report for Project Delta",
  },
];

//Get all documents or limit by query
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(documents.slice(0, limit));
  }

  res.status(200).json(documents);
});

//Get employee by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const document = documents.find((document) => document.id === id);
  if (!document) {
    return res.status(404).json({ error: "Document not found" });
  }

  res.status(200).json(document);
});

//Create new document
router.post("/", (req, res) => {
  let newDocument = {
    id: documents.length + 1,
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
  };

  if (
    !newDocument.name ||
    !newDocument.type ||
    !newDocument.description
  ) {
    return res
      .status(400)
      .json({ msg: "Please make sure that all items are filled out" });
  }

  documents.push(newDocument);
  res.status(201).json(newDocument);
});

//Update document by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const document = documents.find((document) => document.id === id);

  if (!document) {
    return res.status(404).json({ msg: `Document ${id} not found` });
  }

  document.name = req.body.name;
  document.type = req.body.type;
  document.description = req.body.description;
  res.status(200).json(document);
});

//Delete employee by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const document = documents.find((document) => document.id === id);

  if (!document) {
    return res.status(404).json({ msg: `Document ${document} not found` });
  }

  documents = documents.filter((document) => document.id !== id);
  res.status(200).json(documents);
});

export default router;
