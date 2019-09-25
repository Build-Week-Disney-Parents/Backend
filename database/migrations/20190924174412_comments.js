exports.up = function(knex) {
  return knex.schema.createTable("comments", table => {
    table.increments();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("request_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("requests")
      .onDelete("CASCADE");
    table.text("body", 512).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("comments");
};
