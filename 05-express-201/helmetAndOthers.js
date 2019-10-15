const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/ajax", (req, res) => {
  console.log(req.body);
  res.json(["test", 1, 2, 3]);
});

app.listen(3000);
