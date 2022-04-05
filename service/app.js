require("dotenv").config({ override: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

console.log(process.env.DB_PASSWORD);
// const DB_PASSWORD = process.env.DB_PASSWORD;

const homeRoutes = require("./routes/home");
const usersRoutes = require("./routes/users-routes");
const router = require("./routes/home");

const sequelize = require("./config/database");

const Users = require("./models/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/home/", homeRoutes);

app.use("/api/users", usersRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3001);
    //pending set timezone
    console.log("App listening on port 3001");
  })
  .catch((err) => {
    console.log(err);
  });
