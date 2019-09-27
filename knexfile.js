require("dotenv").config();

module.exports = {
  development: {
    debug: true,
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/development.sqlite3"
    },
    pool: {
      afterCreate: (connection, callback) => {
        connection.run("PRAGMA foreign_keys = ON", callback);
      }
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/development/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations"
    }
  }
};
