const express = require("express");
const cors = require('cors');
const carsRouter = require('./cars/cars-router');

const server = express();

server.use((req, res, next) => {
    next();
});

server.use(express.json());
server.use('/api/cars', carsRouter);
server.use(cors());

module.exports = server;
