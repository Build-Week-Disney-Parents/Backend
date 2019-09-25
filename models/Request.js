const knex = require("../database/db.js");

module.exports = { all, getByID, create };

function all() {
  return knex("requests as r")
    .join("users as u", "u.id", "r.user_id")
    .select(
      "r.id",
      "r.user_id",
      "u.username",
      "u.full_name",
      "r.title",
      "r.description",
      "r.meeting_time",
      "r.request_type",
      "r.location",
      "r.created_at"
    )
    .orderBy("r.id", "desc");
}

function getByID(id) {
  return all()
    .where("r.id", id)
    .first();
}

function create(request) {
  return knex("requests")
    .insert(request)
    .then(id => getByID(id[0]));
}
