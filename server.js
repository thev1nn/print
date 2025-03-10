// server.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json());

// Simple in-memory product store (to keep things simple)
let products = JSON.parse(fs.readFileSync("products.json", "utf8")) || [];

// Serve static HTML file
app.use(express.static("public"));

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Add a product
app.post("/api/products", (req, res) => {
  console.log(req.body);
  const newProduct = req.body;
  products.push(newProduct);
  fs.writeFileSync("products.json", JSON.stringify(products));
  res.status(201).json(newProduct);
});

// Delete a product
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== id);
  fs.writeFileSync("products.json", JSON.stringify(products));
  res.sendStatus(204);
});

// Update a product
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  products = products.map((product) =>
    product.id === id ? updatedProduct : product
  );
  fs.writeFileSync("products.json", JSON.stringify(products));
  res.json(updatedProduct);
});

// Start the server
const port = 3005;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
