var express = require("express");

const movieDetails = require("../data/movieDetails");

var router = express.Router();

function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json" });
  } else {
    next();
  }
}

router.param("movieId", (req, res, next) => {
  // update the db with analytics data
  console.log("Someone hit /movie/movieId route");
  next();
});

// GET /movie/top_rated
router.get("/top_rated", (req, res, next) => {
  let page = req.query.page;
  if (!page) page = 1;

  const results = movieDetails.sort((a, b) => b.vote_average - a.vote_average);
  const indexStart = (page - 1) * 20;
  res.json(results.slice(indexStart, indexStart + 19));
});

// GET /movie/movieId
router.get("/:movieId", (req, res, next) => {
  const movieId = Number(req.params.movieId);
  const results = movieDetails.find(movie => movie.id === movieId);
  if (!results) {
    res.json({ msg: "movieId is not found", production_companies: [] });
  } else {
    res.json(results);
  }
});

// POST /movie/movieId/rating
router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const movieId = Number(req.params.movieId);
  const userRating = req.body.value;
  if (userRating < 0.5 || userRating > 10) {
    res.json({ msg: "Rating must be between 0.5 and 10" });
  } else {
    res.json({ msg: "Thanks for submitting your rating", status_code: 200 });
  }
});

// DELETE /movie/movieId/rating
router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  res.json({ msg: "Rating deleted" });
});

module.exports = router;
