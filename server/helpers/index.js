module.exports = (knex) => {
  const getUserToken = (req, res) => {
    return new Promise(function (resolve, reject) {
      if (!req.body.token) {
        reject({ message: "Please login or register" });
      }

      resolve(req.body.token);
    });
  };

  const getUserByToken = (token) => {
    return new Promise(function (resolve, reject) {
      knex
        .select("name", "entries")
        .from("login")
        .innerJoin("users", "users.id", "login.user_id")
        .where("login.token", token)
        .then((result) => {
          if (result.length !== 1) {
            return reject({ message: "User not found" });
          }

          const { name, entries } = result[0];
          return resolve({ name, entries, token });
        })
        .catch((err) => {
          reject({ message: "Cannot find user." });
        });
    });
  };

  return {
    getUserToken,
    getUserByToken,
  };
};
