import express from "express";
import Sequelize from "sequelize";
const router = express.Router();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_LOCAL_PORT),
    dialect: "mysql",
    pool: {
      max: 3,
      min: 0,
      idle: 20 * 1000,
      acquire: 30 * 1000,
    },
  }
);

let dbMessage;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    dbMessage = "Connection has been established successfully.";
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
    dbMessage = "Unable to connect to the database: ";
  });

router.get("/", async (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
    dbMessage: dbMessage,
  };
  return res.status(200).json({ res: data }).end();
});

export default router;
