const express = require('express');
const http = require('http');
require('./utils/database').createConnection();
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());

const server = http.Server(app);

app.use(routes);
app.use(cors)

server.listen("10002");
