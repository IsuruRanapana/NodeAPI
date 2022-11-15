const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello world from NodeJS')
});

app.listen(port, '127.0.0.1', () => {
    console.log(`A node js API is listening on port ${port}`);
});