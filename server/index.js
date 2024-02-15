const express = require("express");
const multer = require("multer");
const { convertFlow } = require("./service");

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

app.get("/", (req, res) => {
  res.send("Healthy");
});

app.post("/convert", upload.single("subtitles"), convertFlow);

app.listen(3000, () => console.log("Converter is up listening on 3000"));