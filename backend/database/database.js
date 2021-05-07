/* DEPENDENCIES */
const Database = require("pg").Pool;
require("dotenv").config();

/* CONNECTION */
function connectionBuilder() {
    return new Database({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      ssl: true
  }); 
}

/* EXPORT: DATABASE */
const database = connectionBuilder();
module.exports = database;
