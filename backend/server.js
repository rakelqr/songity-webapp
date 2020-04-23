const connection = require('./config');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const port = 3003;

// MIDDLEWARES
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));



// listen
server.listen(port, () => console.log(`Server listening on port ${port}`));
