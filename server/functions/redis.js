// const { promisify } = require("util");

module.exports = (redisClient) => {
  const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));
  // const setToken = (key, value) => {
  //   return new Promise((resolve, reject) => {
  //     // console.log("setToken -> redisClient", redisClient);
  //     // const reply = redisClient.set(key, value);
  //     // console.log("setToken -> reply", reply);
  //     // resolve(redisClient.set(key, value));
  //     const getAsync = promisify(redisClient.set(key, value)).bind(redisClient);

  //     getAsync
  //       .then((reply) => {
  //         console.log("setToken -> reply", reply);
  //         resolve(reply);
  //       })
  //       .catch(console.error);
  //   });
  // };

  const getAuthToken = (req, res) => {
    return new Promise((resolve, reject) => {
      const { authorization } = req.headers;
      if (!authorization) {
        return reject({ message: "Unauthorized" });
      }

      token = authorization.replace(/^Bearer\s/g, "");
      if (!token) {
        return reject({ message: "Unauthorized" });
      }

      resolve(token);
    });
  };

  // const getAuthTokenId = (req, res) => {
  //   return new Promise((resolve, reject) => {
  //     const { authorization } = req.headers;
  //     if (!authorization) {
  //       return reject({ message: "Unauthorized" });
  //     }

  //     token = authorization.replace(/^Bearer\s/g, "");
  //     if (!token) {
  //       return reject({ message: "Unauthorized" });
  //     }

  //     console.log("getAuthTokenId -> token", token);
  //     redisClient.get(token, (err, reply) => {
  //       console.log("getAuthTokenId -> err", err);
  //       if (err || !reply) {
  //         return reject({ message: "Unauthorized" });
  //       }
  //       console.log("getAuthTokenId -> reply: ", reply);
  //       return resolve(reply);
  //     });
  //   });
  // };
  const getAuthTokenId = (req, res) => {
    return new Promise((resolve, reject) => {
      getAuthToken(req, res)
        .then((token) =>
          redisClient.get(token, (err, reply) => {
            if (err || !reply) {
              return reject({ message: "Unauthorized" });
            }
            return resolve(reply);
          })
        )
        .catch((error) => reject(error));
    });
  };

  const delToken = (key) => Promise.resolve(redisClient.del(key));
  return { getAuthToken, setToken, getAuthTokenId, delToken };
};
