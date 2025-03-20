const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost", // Change if running remotely
  database: "mydb",
  password: "4321",
  port: 5433, // Default PostgreSQL port
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL successfully!"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = client;
