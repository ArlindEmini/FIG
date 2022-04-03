const express = require ("express");
const bodyParser = require("body-parser");
const cors = require ("cors");

const app = express();

const homeRoutes = require("./routes/home");
const router = require("./routes/home");

const sequelize = require('./config/database');


const Users = require("./models/Users");


app.use(cors())
 app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/home/", homeRoutes)

sequelize.sync()
	.then(() => {
		app.listen(3001);
		//pending set timezone
		console.log("App listening on port 3001" );
	})
	.catch(err => {
		console.log(err);
	});


