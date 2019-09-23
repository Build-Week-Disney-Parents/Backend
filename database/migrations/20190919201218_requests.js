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
    table.datetime("meeting_time").notNullable();
    table.enu("request_type", ["stroller", "childcare"]).notNullable();
    table.text("location", 64).notNullable();
    table.timestamps().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("requests");
};
