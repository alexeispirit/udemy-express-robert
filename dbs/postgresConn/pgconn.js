const express = require("express");
const PoolClass = require("pg").Pool;

const app = express();

const pool = new PoolClass({
  user: "postgres",
  host: "localhost",
  database: "testdb",
  port: 5432,
  password: "postgres"
});

app.get("/", (req, res) => {
  const query = "SELECT * FROM table WHERE id > $1;";
  const dataFromUser = 36;

  pool.query(query, [dataFromUser], (error, dbResponse) => {
    console.log(dbResponse.rows);
    res.json(dbResponse.rows);
  });

  pool.end();
});

app.listen(3000);
