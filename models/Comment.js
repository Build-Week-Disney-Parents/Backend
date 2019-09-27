const knex = require("../database/db.js");

module.exports = { getByID, getRequestComments, create };

function getByID(id) {
  return knex("comments")
    .where({ id })
    .first();
}

function getRequestComments(id) {
  return knex("comments as c")
    .join("users as u", "c.user_id", "u.id")
    .select(
      "c.id",
      "u.id",
      "u.username",
      "u.full_name",
      "c.body",
      "c.created_at"
    )
    .where("request_id", id)
    .orderBy("c.id", "desc");
}

function create(comment) {
  return knex("comments").insert(comment);
}
