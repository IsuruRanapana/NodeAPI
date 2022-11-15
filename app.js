const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8000;

///bringing routes
const {getPosts} = require("./routes/post");

//middleware
app.use(morgan('dev'));

app.get('/', getPosts);

app.listen(port, '127.0.0.1', () => {
    console.log(`A node js API is listening on port ${port}`);
});