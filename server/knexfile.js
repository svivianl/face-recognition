require("dotenv").config();

const connection = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;

module.exports = {
  development: {
    client: "pg",
    version: "8.0",
    connection,
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations",
    },
    // seeds: {
    //   directory: './db/seeds'
    // }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL + "?ssl=true",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations",
    },
    // seeds: {
    //   directory: './db/seeds'
    // }
  },
  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
