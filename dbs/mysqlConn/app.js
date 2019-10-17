const express = require("express");

const app = express();

const mysqlDb = require("./mysqlConnet");

app.get("/", (req, res) => {
  const query = "SELECT * FROM table WHERE id > ?";
  const param = 3;
  mysqlDb.query(query, [param], (err, results) => {
    res.json(results);
  });
});

app.listen(3000);
