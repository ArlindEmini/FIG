// require("dotenv").config();
const Sequelize = require("sequelize");

// const DB_HOST = process.env.DB_HOST;
// const DB_PORT = process.env.DB_PORT;
// const DB_DATABASE = process.env.DB_DATABASE;
// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;

export const database = new Sequelize(
	process.env.MYSQL_DATABASE,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD,
	{
		host: process.env.MYSQL_HOST,
		database: process.env.MYSQL_DATABASE,
		port: Number(process.env.MYSQL_LOCAL_PORT),
		dialect: 'mysql',
		pool: {
			max: 3,
			min: 0,
			idle: 20 * 1000,
			acquire: 30 * 1000,
		},
	},
);

module.exports = sequelize;
