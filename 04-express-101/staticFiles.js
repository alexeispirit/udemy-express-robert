const express = require("express");

const app = express();

// app comes with a use method
// use takes 1 arg:
// 1. the middleware to run
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server is on 3000");
});
