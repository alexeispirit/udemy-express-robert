var express = require("express");
var router = express.Router();
const fs = require("fs");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

dotenv.config();

const upload = multer({ dest: "public/images/uploads" });

aws.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

const s3 = new aws.S3({});

const uploadS3 = multer({
  storage: multers3({
    s3: s3,
    acl: "public-read",
    bucket: "multes-s3-udemy-express",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    }
  })
});

router.post("/uploadFile", upload.single("meme"), function(req, res, next) {
  // rename file with fs module
  // upload path to db
  res.json(req.file);
});

router.post("/uploadFiles", upload.array("meme", 2), function(req, res, next) {
  res.json(req.files);
});

router.post("/uploadS3", uploadS3.single("meme"), (req, res, next) => {
  console.log(req.file);
  res.json("File uploaded to s3");
});

module.exports = router;
