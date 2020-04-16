"use strict";

const express = require("express");
const router = express.Router();

const helper = require("../helpers/clarifai");

module.exports = (knex) => {
  const middleware = require("../middleware/index")(knex);

  router
    .route("/face-recognition")
    .all(middleware.isLoggedIn)
    .post(helper.faceRecognition);

  return router;
};
