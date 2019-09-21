exports.up = function(knex) {
  return knex.schema.createTable("requests", table => {
    table.increments();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.text("title", 64).notNullable();
    table.text("description", 256);
    table.datetime("meeting_time");
    table.text("location", 64).notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("requests");
};
