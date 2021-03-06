"use strict";

module.exports = (knex, redisClient) => {
  const fn = require("../functions/users")(knex, redisClient);
  const jwtFn = require("../functions/jwt")(redisClient);
  const redis = require("../functions/redis")(redisClient);

  const register = (req, res) => {
    fn.hanldeRegister(req, res)
      .then((data) => jwtFn.createSessions(data))
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  const login = (req, res) => {
    const { authorization } = req.headers;
    return authorization
      ? redis
          .getAuthTokenId(req, res)
          .then((data) =>
            jwtFn
              .decodeToken(req, res)
              .then((data) => {
                const { dbToken, id } = data;
                res.status(200).json({ token: dbToken, id });
              })
              .catch((error) => res.status(400).json(error))
          )
          .catch((error) => res.status(400).json(error))
      : fn
          .hanldeLogin(req, res)
          .then((data) => jwtFn.createSessions(data))
          .then((data) => res.status(200).json(data))
          .catch((error) => res.status(400).json(error));
  };

  const logout = (req, res) => {
    redis.delToken("token");
    fn.hanldeLogout(req, res)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  const getUser = (req, res) => {
    fn.getUserById(req.params.userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  const putUserImage = (req, res) => {
    fn.hanldePutUserImage(req.params.userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(400).json(error));
  };

  return {
    register,
    login,
    logout,
    getUser,
    putUserImage,
  };
};
