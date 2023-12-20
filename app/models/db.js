const pg = require("pg")
const dbConfig = require("../config/db.config");

// Create a connection to the database
const connection = new pg.Client({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  database: dbConfig.DATABASE,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  keepAlive: dbConfig.KEEPALIVE,
});

// open the Postgres connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;