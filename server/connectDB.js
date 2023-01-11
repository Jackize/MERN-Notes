const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.PASSWORD_DB;

const MONGODB_URI = `mongodb+srv://phoneBook:${password}@cluster0.9btovaj.mongodb.net/?retryWrites=true&w=majority`;

console.log("connecting to", MONGODB_URI);
const connectDB = async () => {
  mongoose
    .set("strictQuery", true)
    .connect(MONGODB_URI)
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message);
    });
};

module.exports = {
  connectDB,
};
