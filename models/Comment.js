const knex = require("../database/db.js");

module.exports = { getByID, create };

function getByID(id) {
  return knex("comments")
    .where({ id })
    .first();
}

function create(comment) {
  return knex("comments").insert({ comment });
}
