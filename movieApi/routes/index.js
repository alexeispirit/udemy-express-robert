var express = require("express");

const movies = require("../data/movies");

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/most_popular", (req, res, next) => {
  let page = req.query.page;
  if (page === undefined) {
    page = 1;
  }

  let results = movies.filter(movie => movie.most_popular);
  const indexStart = (page - 1) * 20;
  results = results.slice(indexStart, indexStart + 19);
  res.json({ results });
});

module.exports = router;
