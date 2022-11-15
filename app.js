const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8000;

///bringing routes
const postRoutes = require("./routes/post");

//middleware
app.use(morgan('dev'));

app.use('/', postRoutes);

app.listen(port, '127.0.0.1', () => {
    console.log(`A node js API is listening on port ${port}`);
});