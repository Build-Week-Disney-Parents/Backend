const knex = require("knex");
const knexfile = require("../knexfile.js")[process.env.NODE_ENV];

module.exports = knex(knexfile);
