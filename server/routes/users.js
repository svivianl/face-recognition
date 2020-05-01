"use strict";

const express = require("express");
const router = express.Router();

module.exports = (knex, redisClient) => {
  const middleware = require("../middleware/index")(knex, redisClient);
  const helperUsers = require("../helpers/users")(knex, redisClient);

  router.route("/register").post(helperUsers.register);

  router.route("/signin").post(helperUsers.login);

  router
    .route("/signout")
    .all(middleware.isAuthenticated)
    .post(helperUsers.logout);

  router
    .route("/user/:userId/image")
    .all(middleware.isAuthenticated)
    .all(middleware.isAuthorized)
    .post(helperUsers.putUserImage);

  router
    .route("/user/:userId")
    .all(middleware.isAuthenticated)
    .all(middleware.isAuthorized)
    .get(helperUsers.getUser);
  // .post(helperUsers.putUser);

  return router;
};
