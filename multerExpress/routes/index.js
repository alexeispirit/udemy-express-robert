const fs = require("fs");

var express = require("express");
const multer = require("multer");

var router = express.Router();

const upload = multer({ dest: "public/uploads" });

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/formsub", upload.single("meme"), (req, res, next) => {
  const newPath = `public/uploads/${Date.now()}-${req.file.originalname}`;
  fs.rename(req.file.path, newPath, err => {
    if (err) throw err;
    // upload new path to db
    res.json("file uploaded");
  });
});

router.post("/formsubarray", upload.array("meme"), (req, res, next) => {
  console.log(req.files);
  // make this through forEach
  // const newPath = `public/uploads/${Date.now()}-${req.file.originalname}`;
  // fs.rename(req.file.path, newPath, err => {
  //   if (err) throw err;
  //   // upload new path to db
  //   res.json("file uploaded");
  // });
});

router.post(
  "/formsubarray",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 8 }
  ]),
  (req, res, next) => {
    console.log(req.files);
    // make this through forEach
    // const newPath = `public/uploads/${Date.now()}-${req.file.originalname}`;
    // fs.rename(req.file.path, newPath, err => {
    //   if (err) throw err;
    //   // upload new path to db
    //   res.json("file uploaded");
    // });
  }
);

module.exports = router;
