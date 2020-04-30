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

  const getAuthTokenId = (req, res) => {
    return new Promise((resolve, reject) => {
      const { authorization } = req.headers;
      redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
          return reject({ message: "Unauthorized" });
        }
        console.log("getAuthTokenId -> reply: ", reply);
        return resolve(reply);
      });
    });
  };

  return { setToken, getAuthTokenId };
};
