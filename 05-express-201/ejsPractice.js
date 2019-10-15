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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function validateUser(req, res, next) {
  // ... validated logic
  res.locals.validated = true;
  next();
}

app.use(validateUser);

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/", (req, res, next) => {
  // the data in the 2nd arg is going to be appended to res.locals
  res.render("index", {
    msg: "Success",
    html:
      "<img src='https://images.unsplash.com/photo-1570942872213-1242607a35eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80' />"
  });
});

app.listen(3000);
