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
const passport = require('./auth');
require("dotenv").config();


const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware =  passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Welcome to my hotel");
});

app.get("/chicken", (req, res) => {
  res.send("sure sir,here is the chicken");
});

app.post("/item", (req, res) => {
  res.send({ success: true, message: "here are the required items " });
});

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const studentRoutes = require("./routes/studentRoutes");
const Person = require("./modules/person");

app.use("/person", personRoutes);
app.use("/menu",  menuItemRoutes);
app.use("/student", studentRoutes);

app.listen(PORT);
