"use strict";

const fn = require("../functions/clarifai");

const faceRecognition = (req, res) => {
  fn.handleFaceRecognition(req, res)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
};

module.exports = { faceRecognition };
