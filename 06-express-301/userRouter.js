const express = require("express");

let router = express.Router();

function validateUser(req, res, next) {
  res.locals.validated = true;
  next();
}

// this middleware will only be added to this router
router.use(validateUser);

router.get("/", (req, res, next) => {
  res.json({
    msg: "User works"
  });
});

module.exports = router;
