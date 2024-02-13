const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const db = process.env.MONGO_DB;
const connectDB = async () => {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};
module.exports = connectDB;
