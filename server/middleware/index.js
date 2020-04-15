module.exports = (knex) => {
  const helpers = require("../helpers/index")(knex);

  return {
    isLoggedIn: (req, res, next) => {
      helpers
        .getUserToken(req, res)
        .then(helpers.getUserByToken)
        .then((user) => next())
        .catch((error) => res.status(400).json(error));
    },
  };
};
