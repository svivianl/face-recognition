"use strict";

const express = require("express");
const router = express.Router();

module.exports = (knex, redisClient) => {
  const middleware = require("../middleware/index")(knex, redisClient);
  const helperUsers = require("../helpers/users")(knex, redisClient);

  router.route("/register").post(helperUsers.register);

  router.route("/signin").post(helperUsers.login);

  router.route("/signout").all(middleware.isLoggedIn).post(helperUsers.logout);

  router.route("/user").get(middleware.isLoggedIn);
  router.route("/user").all(middleware.isLoggedIn).post(helperUsers.putUser);

  return router;
};
