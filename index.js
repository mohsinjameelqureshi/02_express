import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// Add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

// Get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// Get tea by ID
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found!!!");
  res.status(200).send(tea);
});

// Update tea by ID
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found!!!");

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(tea);
});

// Delete tea by ID
app.delete("/teas/:id", (req, res) => {
  const teaIndex = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (teaIndex === -1) return res.status(404).send("Tea not found!!!");

  teaData.splice(teaIndex, 1);
  res.status(204).send(); // 204 should not send a body
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
