module.exports = (knex, redisClient) => {
  const jwt = require("../functions/jwt")(knex, redisClient);

  return {
    isLoggedIn: (req, res, next) => {
      jwt
        .isAuthenticated(req, res, next)
        .then((user) => next())
        .catch((error) => res.status(400).json(error));
    },
  };
};
