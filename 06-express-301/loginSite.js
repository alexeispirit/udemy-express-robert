const path = require("path");

const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();

app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  if (req.query.msg === "fail") {
    res.locals.msg = "Sorry. This username and password incorrect";
  } else {
    res.locals.msg = "";
  }

  next();
});

app.get("/", (req, res, next) => {
  res.send("check");
});

app.get("/login", (req, res, next) => {
  // req.query - object with property for every key in the query string
  console.log(req.query);
  res.render("login");
});

app.post("/process_login", (req, res, next) => {
  // req.body is made by urlencoded, which parses the http message for sent data
  const { username, password } = req.body;
  // check the db to see if user is valid
  // if valid...
  // - save username in cookie
  // - send user to welcome page
  if (password === "x") {
    // res.cookie takes 2 args:
    // 1. name of the cookie
    // 2. value to set
    res.cookie("username", username);
    // res.redirect takes 1 arg
    // 1. Where to send the browser
    res.redirect("/welcome");
  } else {
    res.redirect("/login?msg=fail");
  }
});

app.get("/welcome", (req, res, next) => {
  // req.cookies will have property for every named cookie has been set
  res.render("welcome", { username: req.cookies.username });
});

// app.parans() - takes 2 args:
// 1. param to look for in the route
// 2. callback to run
app.param("id", (req, res, next, value) => {
  console.log(value);
  next();
});

// : - wildcard
app.get("/story/:id", (req, res, next) => {
  // req.params always exists
  // it will have a property for each wildcard in the route
  const { id } = req.params;
  res.send(`<h1>Story ${id}</h1>`);
});

app.get("/statement", (req, res, next) => {
  // This will render the statement in the browser
  // res.sendFile(path.join(__dirname, "userStatements/BankStatement.png"));

  // app has download method with 2 args
  // 1. filename
  // 2. optionally name to download as
  // 3. callback for error
  // download is setting headers
  // 1. content-dispositions to attachement with filename of the 2nd arg
  res.download(
    path.join(__dirname, "userStatements/BankStatement.png"),
    "statement.png",
    error => {
      if (error) console.log(error);
      // res.headersSent is a bool, true if headers are already sent
      if (!res.headersSent) {
        res.redirect("/download/error");
      }
    }
  );
});

app.get("/logout", (req, res, next) => {
  // res.clearCookie takes 1 arg:
  // 1. cookie to clear (by name)
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000);
