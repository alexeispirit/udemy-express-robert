const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "user",
  password: "password",
  database: "testdb"
});

module.exports = {
  query: (queryText, params, callback) => {
    return pool.query(queryText, params, callback);
  }
};

// const dataFromUser = 3;

// pool.query(
//   "SELECT 1 + ? AS solution",
//   [dataFromUser],
//   (err, results, fields) => {
//     if (err) throw err;
//     console.log(results[0].solution);
//   }
// );
