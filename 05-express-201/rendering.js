const path = require("path");
const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());
// serve static files
app.use(express.static("public"));
// parse json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.set() takes 2 args:
// 1. key
// 2. value
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.listen(3000);
