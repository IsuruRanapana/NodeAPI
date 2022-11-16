const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology:true});
        console.log(`MongoDB connected : ${conn.connection.host}`.yellow);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

module.exports = connectDB;
