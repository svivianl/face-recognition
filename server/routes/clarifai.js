"use strict";

const express = require("express");
const router = express.Router();

const helper = require("../helpers/clarifai");

module.exports = (knex, redisClient) => {
  const middleware = require("../middleware/index")(knex, redisClient);

  router
    .route("/face-recognition")
    .all(middleware.isAuthenticated)
    .post(helper.faceRecognition);

  return router;
};
