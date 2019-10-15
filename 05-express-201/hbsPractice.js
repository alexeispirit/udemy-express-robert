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

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

function validateUser(req, res, next) {
  res.locals.validated = true;
  next();
}

app.use(validateUser);

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/", (req, res, next) => {
  res.render("index", {
    countries: [
      {
        name: "Russia",
        capital: "Moscow",
        western: false
      },
      {
        name: "England",
        capital: "London",
        western: true
      }
    ],
    msg: "Success",
    html:
      "<img src='https://images.unsplash.com/photo-1570942872213-1242607a35eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80' />"
  });
});

app.listen(3000);
