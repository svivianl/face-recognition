"use strict";

const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const handleFaceRecognition = (req, res) => {
  return new Promise((resolve, reject) => {
    const url = req.body.url && req.sanitize(req.body.url);

    if (!url) {
      return reject({
        message:
          "Incomplete form submitted. Please check fields and try again.",
      });
    }

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, url)
      .then((data) => {
        const regions = data.outputs[0].data.regions.map((region) => {
          const clarifaiFace = region.region_info.bounding_box;

          return {
            leftCol: clarifaiFace.left_col * 100,
            topRow: clarifaiFace.top_row * 100,
            rightCol: (1 - clarifaiFace.right_col) * 100,
            bottomRow: (1 - clarifaiFace.bottom_row) * 100,
          };
        });
        resolve(regions);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { handleFaceRecognition };
