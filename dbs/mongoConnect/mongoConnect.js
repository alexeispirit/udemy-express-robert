const express = require("express");
const app = express();

const mongodb = require("mongodb");
const mongoClient = mongodb.mongoClient;
const mongoUrl = `mongodb://localhost:27017`;

let db;
mongoClient.connect(mongoUrl, (error, databaseConn) => {
  db = databaseConn.db("testdb");
});

app.get("/", (req, res) => {
  db.collection("collection")
    .find({})
    .toArray((queryError, results) => {
      res.json(results);
    });
});

app.listen(3000);
