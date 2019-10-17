var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const session = require("express-session");

// ========= PASSPORT INCLUDES ==========
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
// ========= PASSPORT INCLUDES ==========

var indexRouter = require("./routes/index");

var app = express();

dotenv.config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());

app.use(
  session({
    secret: "spirit secret",
    resave: false,
    saveUninitialized: true,
    cookieParser: { secure: true }
  })
);
// ========= PASSPORT CONFIG ==========
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth"
    },
    function(accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
// ========= PASSPORT CONFIG ==========

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
