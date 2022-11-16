const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(process.env.DB_URL);
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
