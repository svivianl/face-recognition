"use strict";

const bcrypt = require("bcrypt");
const uuid = require("uuid");

module.exports = (knex) => {
  const helpers = require("./index")(knex);

  return {
    register: (req, res) => {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message:
            "Incomplete form submitted. Please check fields and try again.",
        });
      }

      if (password.length < 2) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long. Please enter new password and try again.",
        });
      }

      const token = uuid.v4();
      const hashedPassword = bcrypt.hashSync(password, 10);

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
              res.status(200).json({ name, token, entries: user.entries });
            });
        })
        .catch((error) =>
          res.status(440).json({ message: "Unable to register" })
        );
    },

    login: (req, res) => {
      const { email, password } = req.body;
      knex
        .select("*")
        .from("users")
        .where("email", email)
        .then((users) => {
          if (!users.length) {
            return res.status(400).json({ message: "Bad credentials" });
          }

          const user = users[0];
          const isValid = bcrypt.compareSync(password, user.password);

          if (!isValid) {
            return res.status(400).json({ message: "Bad credentials" });
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
                      return res.status(200).json({
                        name: user.name,
                        entries: user.entries,
                        token: newToken,
                      });
                    });
                })
                .then(trx.commit)
                .catch(trx.rollback);
            })
            .catch((error) =>
              res.status(440).json({ message: "Unable to log in" })
            );
        });
    },

    logout: (req, res) => {
      knex("login")
        .where("token", req.body.token)
        .del()
        .then((result) =>
          res.status(200).json({ message: "Log out Successful." })
        )
        .catch((err) => res.status(400).json({ message: "Log out Failed." }));
    },

    putUser: (req, res) => {
      const { token } = req.body;

      helpers
        .getUserByToken(token)
        .then((result) => {
          const newEntries = parseInt(result.entries) + 1;

          knex("users")
            .update({ entries: newEntries, updated_at: new Date() })
            .whereIn("id", function () {
              this.select("user_id").from("login").where("token", token);
            })
            .returning("*")
            .then((user) =>
              res
                .status(200)
                .json({ name: user[0].name, entries: user[0].entries, token })
            )
            .catch((error) =>
              res.status(440).json({ message: "Unable to update user" })
            );
        })
        .catch((error) => res.status(400).json(error));
    },
  };
};
