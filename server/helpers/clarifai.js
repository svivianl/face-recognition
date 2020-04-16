"use strict";

const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

module.exports = {
  faceRecognition: (req, res) => {
    const { url } = req.body;

    if (!url) {
      res.status(440).json({
        message:
          "Incomplete form submitted. Please check fields and try again.",
      });
    }

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, url)
      .then((data) => {
        res.status(200).json(data.outputs[0].data.regions);
      })
      .catch((error) => {
        res.status(440).json(error);
      });
  },
};
