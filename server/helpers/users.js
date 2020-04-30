"use strict";

module.exports = (knex, redisClient) => {
  const fn = require("../functions/users")(knex, redisClient);
  const jwtFn = require("../functions/jwt")(knex, redisClient);

  const register = (req, res) => {
    fn.hanldeRegister(req, res)
      .then((data) => jwtFn.createSessions(data))
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  const login = (req, res) => {
    fn.hanldeLogin(req, res)
      .then((data) => jwtFn.createSessions(data))
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  const logout = (req, res) => {
    fn.hanldeLogout(req, res)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  const getUser = (req, res) => {
    fn.hanldeGetUser(req, res)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  const putUser = (req, res) => {
    fn.hanldePutUserImage(req, res)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  return {
    register,
    login,
    logout,
    putUser,
  };
};
