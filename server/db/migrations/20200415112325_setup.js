exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name", 100);
      table.string("email").notNullable().unique();
      table.string("password", 100);
      table.bigInteger("entries").defaultTo(0);
      table.timestamps("created_at");
      table.index(["email"], "email");
    }),

    knex.schema.createTable("login", (table) => {
      table.increments("id").primary();
      table.string("token", 100);
      table.timestamps("created_at");
      table
        .bigInteger("user_id")
        .references("id")
        .inTable("users")
        .notNull()
        .onDelete("cascade");
      table.index(["token"], "token");
      table.index(["created_at"], "created_at");
    }),
  ]);
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable("login"),
    knex.schema.dropTable("users"),
  ]);
};
