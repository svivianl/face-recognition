module.exports = (redisClient) => {
  const jwt = require("../functions/jwt")(redisClient);

  return {
    isAuthenticated: (req, res, next) => {
      jwt
        .isAuthenticated(req, res, next)
        .then((user) => next())
        .catch((error) => res.status(400).json(error));
    },
  };
};
