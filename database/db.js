const knex = require("knex");
const knexfile = require("../knexfile.js");
const DB_ENV = process.env.DB_ENV || "development";

module.exports = knex(knexfile[DB_ENV]);
