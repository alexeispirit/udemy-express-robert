const express = require("express");

const app = express();

// app object has a few methods:
// HTTP/REST verbs
// CRUD app correspondence
// 1. get - READ
// - DEFAULT for all browsers is GET
// 2. post - CREATE
// 3. delete - DELETE
// 4. put - UPDATE
// 5. all - will accept any method

// Takes 2 args:
// 1. path
// 2. callback to run if certain HTTP request is made to the path
app.all("/", (req, res) => {
  res.send("<h1>Welcome to the home page</h1>");
});

app.get("/", (req, res) => {
  console.log(req);
  res.send("<h1>Welcome to the home GET page</h1>");
});

app.post("/", (req, res) => {
  console.log(req);
  res.send("<h1>Welcome to the home GET page</h1>");
});

app.delete("/", (req, res) => {});

app.put("/", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is on 3000");
});
