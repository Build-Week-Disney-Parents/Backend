const knex = require("../database/db.js");

module.exports = { all, getByID, getByName, create };

function all() {
  return knex("users");
}

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
  return knex("users")
    .insert(user)
    .then(id => getByID(id[0]));
}
