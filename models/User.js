const knex = require("../database/db.js");

module.exports = { getByID, getByName, create };

function getByID(id) {
  return knex("users")
    .where({ id })
    .first();
}

function getByName(username) {
  return knex("users")
    .where({ username })
    .first();
}

function create(user) {
  return knex("users").insert(user);
}
