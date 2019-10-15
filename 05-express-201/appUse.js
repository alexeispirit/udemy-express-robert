const express = require("express");

const app = express();

// Express is:
// 1. Router
// 2. Middleware

// REQ----MIDDLEWARE---->RES
// Middleware function is any function that has access to req, res, next object

function validateUser(req, res, next) {
  // get info out of req object
  // do some stuff with the DB
  res.locals.validated = true;
  console.log("VALIDATION RAN");
  next();
}

// run validateUser on ALL paths, all METHODS
app.use(validateUser);
// run validateUser on /admin, all METHODS
app.use("/admin", validateUser);
// run validateUser on /, GET method only
app.get("/", validateUser);

app.get("/", (req, res, next) => {
  res.send("<h1>Main Page</h1>");
  console.log(res.locals.validated);
});

app.get("/admin", (req, res, next) => {
  res.send("<h1>Admin Page</h1>");
  console.log(res.locals.validated);
});

app.listen(3000);
