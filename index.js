import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// Adding teas
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

// Get All teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// Get a specific tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea no found!!!");
  }
  res.status(200).send(tea);
});

// update a tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea no found!!!");
  }
  console.log(req.body);
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const teaIndex = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  console.log(teaIndex);
  if (teaIndex === -1) {
    return res.status(404).send("Tea no found!!!");
  }
  teaData.splice(teaIndex, 1);
  res.status(204).send("Tea Deleted");
});

app.listen(port, () => {
  console.log(`server is running at port: ${port}...`);
});
