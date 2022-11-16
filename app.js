require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

connectDB();

const app = express();
const port = process.env.PORT || 8000;

///bringing routes
const postRoutes = require("./routes/post");

//middleware
app.use(morgan('dev'));

app.use('/', postRoutes);

app.listen(port, '127.0.0.1', () => {
    console.log(`A node js API is listening on port ${port}`);
});