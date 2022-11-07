const express = require('express');
const postgresql = require('pg');
const http = require('http');
const routes = require('./routes')

const app = express();
const server = http.Server(app);

postgresql.Connection("uri", "option");

app.use(express.json());
app.use(routes);

server.listen("10002");
