// require("dotenv").config();
const Sequelize = require("sequelize");

// const DB_HOST = process.env.DB_HOST;
// const DB_PORT = process.env.DB_PORT;
// const DB_DATABASE = process.env.DB_DATABASE;
// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_HOST = "localhost";
const DB_PORT = "3001";
const DB_DATABASE = "figdatabase";
const DB_USERNAME = "root";
const DB_PASSWORD = "password";

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
});

module.exports = sequelize;
