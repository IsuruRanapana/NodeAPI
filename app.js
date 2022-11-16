require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");

connectDB();

const app = express();
const port = process.env.PORT || 8000;

///bringing routes
const postRoutes = require("./routes/post");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/posts", postRoutes);
// app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`A node js API is listening on port ${port}`);
});
