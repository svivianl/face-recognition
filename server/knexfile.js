require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    version: "8.0",
    connection: process.env.DATABASE_URI,
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
    connection: process.env.DATABASE_URI + "?ssl=true",
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
