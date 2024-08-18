const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();

const uploadDir = "data";

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir + "/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create the data directory if it doesn't exist

if (!fs.existsSync("./" + uploadDir)) {
  fs.mkdirSync("./" + uploadDir);
}

// Set up a route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send("File uploaded successfully.");
});

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start the server
app.listen(3000, () => {
  console.log("Listening on http://127.0.0.1:3000");
});
