const express = require('express');
const http = require('http');
const websocket = require('./websocket')
const {getPool} = require('./utils/database');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const serviceProduct = require('./services/product')
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());

const server = http.createServer(app);
websocket.init(server);

(async () => {
        try {
            const pool = await getPool();
            serviceUser.init(pool)
            serviceLog.init(pool)
            serviceProduct.init(pool)

        } catch (e) {
            console.error(e)
        }
    }
)();


app.use(routes);
app.use(cors)

server.listen("10002");
