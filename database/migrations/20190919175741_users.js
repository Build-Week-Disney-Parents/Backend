exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .text("username", 32)
      .notNullable()
      .unique();
    table
      .text("password", 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
