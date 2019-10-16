var express = require("express");
const request = require("request");

var router = express.Router();

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

/* GET home page. */
router.get("/", function(req, res, next) {
  request.get(nowPlayingUrl, (err, response, movieData) => {
    if (err) console.log(err);
    const parsedData = JSON.parse(movieData);
  });

  res.render("index", {});
});

module.exports = router;
