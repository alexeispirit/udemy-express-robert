var express = require("express");
var router = express.Router();

const db = require("../database/db");

/* GET home page. */
router.get("/", function(req, res, next) {
  const query = "SELECT * FROM table WHERE id > $1;";
  const dataFromUser = 36;

  db.query(query, [dataFromUser], (error, dbResponse) => {
    console.log(dbResponse.rows);
    res.json(dbResponse.rows);
  });

  // pool.end();
});

router.get("/cities", function(req, res, next) {
  const query = "SELECT * FROM table WHERE id <= $1;";
  const dataFromUser = 36;

  db.query(query, [dataFromUser], (error, dbResponse) => {
    console.log(dbResponse.rows);
    res.json(dbResponse.rows);
  });

  // pool.end();
});

module.exports = router;
