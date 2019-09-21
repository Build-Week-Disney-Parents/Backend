const knex = require("../database/db.js");

module.exports = { all, getByID, create };

function all() {
  return knex("requests");
}

function getByID(id) {
  return knex("requests")
    .where({ id })
    .first();
}

function create(request) {
  return knex("requests")
    .insert({ request })
    .then(id => getByID(id[0]));
}
