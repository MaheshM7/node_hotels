// function add(a,b){
//   return a+b;
// }

// let add = function(a,b){
//   return a+b;
// }

// let add = (a,b) =>{
//   return a+b;
// }

// let add = (a,b) => a+b;
// let result = add(2,3);
// console.log(result);
// console.log("mahesh")

// var os = require('os');
// var user = os.userInfo();
// console.log(user);

const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Welcome to my hotel");
});

app.get("/chicken", (req, res) => {
  res.send("sure sir,here is the chicken");
});

app.post("/item", (req, res) => {
  res.send({ success: true, message: "here are the required items " });
});

const personRoutes = require("./routes/personRoutes")
const menuItemRoutes = require("./routes/menuItemRoutes")
const studentRoutes = require("./routes/studentRoutes")

app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);
app.use("/student",studentRoutes);



app.listen(3000);
