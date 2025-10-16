import express from "express"; // Import Express framework
const router = express.Router(); // Create a new router instance

let projects = [
  // Sample data for projects
  { id: 1, name: "Project Alpha", description: "First project description" },
  { id: 2, name: "Project Beta", description: "Second project description" },
  { id: 3, name: "Project Gamma", description: "Third project description" },
  { id: 4, name: "Project Delta", description: "Fourth project description" },
];

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit); // Get limit from query parameters
  if (!isNaN(limit) && limit > 0) { // Validate limit
    return res.status(200).json(projects.slice(0, limit)); // Return limited projects
  }

  res.status(200).json(projects); // Return all projects
});

router.get("/:id", (req, res) => { // Get project by ID
  const id = parseInt(req.params.id); // Parse ID from request parameters
  const project = projects.find((project) => project.id === id); // Find project by ID
  if (!project) { // If project not found
    return res.status(404).json({ error: "Project not found" }); // Return 404 error
  }
  res.status(200).json(project); // Return the found project
});

export default router; // Export the router to be used in other parts of the application
