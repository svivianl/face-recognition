module.exports = (knex, redisClient) => {
  const jwt = require("../functions/jwt")(redisClient);
  const fn = require("../functions/users")(knex);

  const isAuthenticated = (req, res, next) => {
    jwt
      .isAuthenticated(req, res, next)
      .then((user) => next())
      .catch((error) => {
        console.error;
        res.status(400).json(error);
      });
  };

  const isAuthorized = (req, res, next) => {
    jwt
      .decodeToken(req, res)
      .then((data) => data.dbToken)
      .then((token) => fn.getUserByToken(token))
      .then((user) =>
        user.id == req.params.userId
          ? next()
          : res.status(400).json({ message: "Unauthorized" })
      )
      .catch((error) => {
        console.error;
        res.status(400).json(error);
      });
  };

  return {
    isAuthenticated,
    isAuthorized,
  };
};
