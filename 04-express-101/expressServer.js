const express = require("express");

// app is the express function createApplication inside Express module invoked
const app = express();

// all is a method and it takes 2 args
// 1. route
// 2. callback to run if route is requested
app.all("*", (req, res) => {
  // Express handles the basic headers (statusCode, mimeType)
  res.send("<h1>This is the home page</h1>");
  // Express handles the end of request
});

app.listen(3000, () => {
  console.log("server is on 3000");
});
