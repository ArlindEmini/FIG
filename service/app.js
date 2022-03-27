
const express = require ("express");
const bodyParser = require("body-parser");
const cors = require ("cors");
const app = express();
const mysql = require("mysql")

const homeRoutes = require("./routes/home");
const router = require("./routes/home");

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password: "password",
    database: "figdatabase"
})

app.use(cors())
 app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/home/", homeRoutes)

// app.get("/", (req,res)=> {
//     const sqlInsert ="INSERT INTO employees (name, surname, age) VALUES ('arlind', 'emini', '24' );"
//     db.query(sqlInsert, (err, result)=>{
//         console.log("result", result)
//         console.log("err55", err)
//         res.send("Hello Nodejs")
//     })
// })

// app.get("/", (req,res)=> {
//     console.log("test")
//         res.send("Hello Nodejs")
// })


// app.get("/api/get", (req,res)=>{
//     const sqlSelect = "SELECT * FROM employees";
//     db.query(sqlSelect, (err, result)=> {
//         res.send(result)
//     })
// })



app.listen(3001, () => {
    console.log("server running on port 3001")
})