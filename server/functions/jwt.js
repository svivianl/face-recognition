const jwt = require("jsonwebtoken");

module.exports = (redisClient) => {
  const redis = require("./redis")(redisClient);

  const signToken = (token) => {
    const jwtPayload = { token };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "1 day",
      algorithm: "HS256",
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE,
    });
  };

  // const dbToken = async (data) => {
  //   console.log("-----getDbToken -> getDbToken");
  //   console.log("dbToken -> data", data);
  //   try {
  //     const resultado = await jwt.verify(data, process.env.JWT_SECRET, {
  //       algorithm: "HS256",
  //       issuer: process.env.ISSUER,
  //       audience: process.env.AUDIENCE,
  //     });
  //     console.log("----getDbToken -> resultado", resultado);
  //     return resultado.token;
  //   } catch (error) {
  //     console.log("----error: ", error);
  //   }
  // };

  const getDbToken = (req, res) => {
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
        .then((data) => resolve(data.token))
        .catch((error) => reject(error));
    });
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

  return { getDbToken, createSessions, isAuthenticated };
};
