const jwt = require("jsonwebtoken");

module.exports = (redisClient) => {
  const redis = require("./redis")(redisClient);

  const signToken = (jwtPayload) => {
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1 day",
      algorithm: "HS256",
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE,
    });
  };

  const decodeToken = (req, res) => {
    return new Promise((resolve, reject) => {
      redis
        .getAuthToken(req, res)
        .then((token) =>
          jwt.verify(token, process.env.JWT_SECRET, {
            algorithm: "HS256",
            issuer: process.env.ISSUER,
            audience: process.env.AUDIENCE,
          })
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  const createSessions = (user) => {
    const { token: dbToken, id } = user;
    const token = signToken({ dbToken, id });
    return redis
      .setToken(token, token)
      .then(() => {
        return { token, id };
      })
      .catch((error) => console.log(error));
  };

  const isAuthenticated = (req, res, next) => {
    return new Promise((resolve, reject) => {
      const { authorization } = req.headers;
      return authorization
        ? redis
            .getAuthTokenId(req, res)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        : reject({ message: "Unauthorized" });
    });
  };

  return { decodeToken, createSessions, isAuthenticated };
};
