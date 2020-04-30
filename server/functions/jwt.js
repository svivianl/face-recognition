const jwt = require("jsonwebtoken");

module.exports = (knex, redisClient) => {
  const fn = require("../functions/users")(knex);
  const redis = require("./redis")(redisClient);

  const signToken = (token) => {
    const jwtPayload = { token };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "1 day" });
  };

  const createSessions = (user) => {
    const { token: dbToken } = user;
    const token = signToken(dbToken);
    return redis
      .setToken(token, token)
      .then(() => {
        return { token };
      })
      .catch((error) => console.log(error));
  };

  const isAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;
    return authorization
      ? redis
          .getAuthTokenId(req, res)
          .then((data) => data)
          .catch((error) => res.status(400).json(error))
      : fn
          .hanldeLogin(req, res)
          .then((data) => createSessions(data))
          .then((data) => res.status(200).json(data))
          .catch((error) => res.status(400).json(error));
  };

  return { createSessions, isAuthenticated };
};
