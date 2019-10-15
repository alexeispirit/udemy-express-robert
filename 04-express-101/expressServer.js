const path = require("path");

const express = require("express");

// app is the express function createApplication inside Express module invoked
const app = express();

// serve static files
app.use(express.static("public"));

// all is a method and it takes 2 args
// 1. route
// 2. callback to run if route is requested
app.all("/", (req, res) => {
  // Express handles the basic headers (statusCode, mimeType)
  // res.send("<h1>This is the home page</h1>");
  res.sendFile(path.join(__dirname, "node.html"));
  // Express handles the end of request
});

app.all("*", (req, res) => {
  res.send("<h1>Sorry, this page does not exists</h1>");
});

app.listen(3000, () => {
  console.log("server is on 3000");
});
