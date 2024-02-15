const express = require("express");
const multer = require("multer");
const { convertFlow } = require("./service");
const { SERVER_IS_HEALTHY } = require("./constants");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./subtitles");
  },
  filename: function (req, file, cb) {
    const extention = file.originalname.split(".").pop();
    cb(null, Date.now() + "-" + file.fieldname + "." + extention);
  },
});

const upload = multer({ storage: storage });
const app = express();

app.post("/convert", upload.single("subtitles"), convertFlow);

app.listen(3000, () => console.log(SERVER_IS_HEALTHY));