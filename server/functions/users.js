"use strict";

const bcrypt = require("bcrypt-nodejs");
const uuid = require("uuid");

const passwordMinLength = 2;

const checkEmailInput = (email) => {
  const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (emailReg.test(email) === false) {
    return "Invalid Email Address";
  }

  return false;
};

module.exports = (knex) => {
  const getUserById = (id) => {
    return new Promise(function (resolve, reject) {
      knex
        .select("id", "name", "entries")
        .from("users")
        .where("id", id)
        .then((result) => {
          if (result.length !== 1) {
            return reject({ message: "User not found" });
          }

          return resolve(result[0]);
        })
        .catch((err) => {
          reject({ message: "Cannot find user." });
        });
    });
  };

  const getUserByToken = (token) => {
    return new Promise(function (resolve, reject) {
      knex
        .select("users.id", "name", "entries")
        .from("login")
        .innerJoin("users", "users.id", "login.user_id")
        .where("login.token", token)
        .then((result) => {
          if (result.length !== 1) {
            return reject({ message: "User not found" });
          }

          return resolve(result[0]);
        })
        .catch((err) => {
          reject({ message: "Cannot find user." });
        });
    });
  };

  const hanldeRegister = (req, res) => {
    return new Promise((resolve, reject) => {
      const name = req.body.name && req.sanitize(req.body.name);
      const email = req.body.email && req.sanitize(req.body.email);
      const password = req.body.password && req.sanitize(req.body.password);

      if (!name || !email || !password) {
        return reject({
          message:
            "Incomplete form submitted. Please check fields and try again.",
        });
      }

      const emailInput = checkEmailInput(email);
      if (emailInput) {
        return reject({ message: emailInput });
      }

      if (password.length < passwordMinLength) {
        return reject({
          message:
            "Password must be at least 8 characters long. Please enter new password and try again.",
        });
      }

      const token = uuid.v4();
      const hashedPassword = bcrypt.hashSync(password);

      knex
        .insert({
          name,
          email,
          password: hashedPassword,
          created_at: new Date(),
        })
        .into("users")
        .returning(["id", "name", "entries"])
        .then((result) => result[0])
        .then((user) => {
          return knex("login")
            .insert({
              token,
              user_id: user.id,
              created_at: new Date(),
            })
            .then((login) => {
              resolve({ token, id: user.id });
            });
        })
        .catch((error) => reject({ message: "Unable to register" }));
    });
  };

  const hanldeLogin = (req, res) => {
    return new Promise((resolve, reject) => {
      const email = req.body.email && req.sanitize(req.body.email);
      const password = req.body.password && req.sanitize(req.body.password);

      if (!email || !password) {
        return reject({
          message:
            "Incomplete form submitted. Please check fields and try again.",
        });
      }

      const emailInput = checkEmailInput(email);
      if (emailInput) {
        return reject({ message: emailInput });
      }

      knex
        .select("*")
        .from("users")
        .where("email", email)
        .then((users) => {
          if (!users.length) {
            return reject({ message: "Bad credentials" });
          }

          const user = users[0];
          const isValid = bcrypt.compareSync(password, user.password);

          if (!isValid) {
            return reject({ message: "Bad credentials" });
          }

          knex
            .transaction((trx) => {
              //delete user from login table
              trx
                .from("login")
                .where("user_id", user.id)
                .del()
                .then((login) => {
                  //insert user in login table
                  knex("login")
                    .insert({
                      token: uuid.v4(),
                      user_id: user.id,
                      created_at: new Date(),
                    })
                    .returning("token")
                    .then((result) => result[0])
                    .then((newToken) => {
                      return resolve({
                        // name: user.name,
                        // entries: user.entries,
                        token: newToken,
                        id: user.id,
                      });
                    });
                })
                .then(trx.commit)
                .catch(trx.rollback);
            })
            .catch((error) => reject({ message: "Unable to log in" }));
        });
    });
  };

  const hanldeLogout = (req, res) => {
    return new Promise((resolve, reject) => {
      knex("login")
        .where("token", req.body.token)
        .del()
        .then((result) => resolve({ message: "Log out Successful." }))
        .catch((err) => reject({ message: "Log out Failed." }));
    });
  };

  const hanldePutUserImage = (id) => {
    return new Promise((resolve, reject) => {
      getUserById(id)
        .then((result) => {
          const newEntries = parseInt(result.entries) + 1;

          knex("users")
            .update({ entries: newEntries, updated_at: new Date() })
            .where("id", id)
            .returning("*")
            .then((users) => users[0])
            .then((user) =>
              resolve({ id, name: user.name, entries: user.entries })
            )
            .catch((error) =>
              reject({ message: "Unable to update user's entries" })
            );
        })
        .catch((error) => reject(error));
    });
  };
  // const hanldePutUserImage = (req, res) => {
  //   return new Promise((resolve, reject) => {
  //     const { token } = req.body;

  //     getUserByToken(token)
  //       .then((result) => {
  //         const newEntries = parseInt(result.entries) + 1;

  //         knex("users")
  //           .update({ entries: newEntries, updated_at: new Date() })
  //           .whereIn("id", function () {
  //             this.select("user_id").from("login").where("token", token);
  //           })
  //           .returning("*")
  //           .then((user) =>
  //             resolve({ name: user[0].name, entries: user[0].entries, token })
  //           )
  //           .catch((error) => reject({ message: "Unable to update user" }));
  //       })
  //       .catch((error) => reject(error));
  //   });
  // };

  return {
    getUserById,
    getUserByToken,
    hanldeRegister,
    hanldeLogin,
    hanldeLogout,
    hanldePutUserImage,
  };
};
