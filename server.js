const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

// app.use(express.static(path.join(__dirname, "public")));

const post = [
  { id: 1, name: "Juan Dela Cruz", position: "Engineer" },
  { id: 2, name: "Maria Basa", position: "Architect" },
  { id: 3, name: "Andres Bonifacio", position: "Foreman" },
];

app.get("/employees", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(post.slice(0, limit));
  }

  res.status(200).json(post);
});

app.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = post.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.status(200).json(post);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
