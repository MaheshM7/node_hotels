const mongoose = require('mongoose');

// Connect to MongoDB
const mongooseURL = "mongodb://localhost:27017/hotels";
mongoose.connect(mongooseURL);

const db = mongoose.connection;

// Event listeners
db.on("error", (error) => {
  console.error("Error in the connection", error);
});

db.on("connected", () => {
  console.log("Database connected");
});

db.on("disconnected", () => {
  console.log("Database disconnected");
});



module.exports = db;
