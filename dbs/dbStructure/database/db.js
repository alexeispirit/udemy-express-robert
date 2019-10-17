const PoolClass = require("pg").Pool;

const pool = new PoolClass({
  user: "postgres",
  host: "localhost",
  database: "testdb",
  port: 5432,
  password: "postgres"
});

module.exports = {
  query: (queryText, params, callback) => {
    return pool.query(queryText, params, callback);
  }
};
