var express = require("express");
const request = require("request");

var router = express.Router();

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get("/", (req, res, next) => {
  request.get(nowPlayingUrl, (err, response, movieData) => {
    if (err) console.log(err);
    const parsedData = JSON.parse(movieData);
    res.render("index", {
      parsedData: parsedData.results
    });
  });
});

router.get("/movie/:id", (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;

  request.get(thisMovieUrl, (err, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render("single-movie", {
      parsedData
    });
  });
});

module.exports = router;
