module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/development/db.sqlite3"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/development/seeds"
    }
  }
};
